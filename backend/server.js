require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const KEY = (process.env.PAYU_MERCHANT_KEY || '').trim();
const SALT = (process.env.PAYU_MERCHANT_SALT || '').trim();
const PAYU_URL = process.env.PAYU_ENV === 'production' ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment';
const PRICES = { MEMBERSHIP: 100, LOGO: 100, ID_CARD: 100 };

app.post('/api/payments/initiate', async (req, res) => {
  try {
    const { txnid: cid, userId = '', quantity = 1, firstname = 'Member', email, phone, productType = 'MEMBERSHIP', productinfo = 'ABDM Payment' } = req.body;
    if (!PRICES[productType]) return res.status(400).json({ error: 'Invalid product type' });
    const qty = productType === 'LOGO' ? Math.max(1, parseInt(quantity, 10) || 1) : 1;
    const amount = (PRICES[productType] * qty).toFixed(2);
    const txnid = cid || `${productType}_${Date.now()}`;
    const name = String(firstname).replace(/[|<>]/g, '').trim();
    const info = String(productinfo).replace(/[|<>]/g, '').trim();
    const mail = (email || `${phone || 'member'}@abdm.org.in`).trim();
    const uid = String(userId || '').trim();
    const hash = crypto.createHash('sha512').update(`${KEY}|${txnid}|${amount}|${info}|${name}|${mail}|${uid}|${productType}|||||||||${SALT}`, 'utf8').digest('hex');
    res.json({ actionUrl: PAYU_URL, payload: { key: KEY, txnid, amount, productinfo: info, firstname: name, email: mail, phone: String(phone || '9999999999').trim(), udf1: uid, udf2: productType, surl: `${process.env.BACKEND_URL}/api/payments/callback`, furl: `${process.env.BACKEND_URL}/api/payments/callback`, hash } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/payments/callback', async (req, res) => {
  const { status, txnid, amount, productinfo, firstname, email, phone, udf1 = '', udf2 = 'MEMBERSHIP', hash, mihpayid, additionalCharges } = req.body;
  let seq = `${SALT}|${status}|||||||||${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${KEY}`;
  if (additionalCharges) seq = `${additionalCharges}|${seq}`;
  const expected = crypto.createHash('sha512').update(seq, 'utf8').digest('hex');
  const front = process.env.FRONTEND_URL || 'https://abdm.org.in';
  const path = udf2 === 'LOGO' ? '/logo-purchase' : udf2 === 'ID_CARD' ? '/id-card-purchase' : '/dashboard';
  if (expected !== hash) return res.redirect(`${front}${path}?payment=security_error&txnid=${txnid}`);
  if (status === 'success') {
    if (udf2 === 'MEMBERSHIP') {
      const q = supabase.from('profiles').update({ membership_status: 'Approved', payment_status: 'paid', txnid, mihpayid });
      await (udf1 ? q.eq('id', udf1) : q.eq('phone', phone));
    } else {
      const tbl = udf2 === 'LOGO' ? 'logo_orders' : 'id_card_orders';
      await supabase.from(tbl).update({ payment_status: 'paid', order_status: 'confirmed', mihpayid }).eq('txnid', txnid);
    }
    return res.redirect(`${front}${path}?payment=success&txnid=${txnid}`);
  }
  return res.redirect(`${front}${path}?payment=failed&txnid=${txnid}`);
});

app.listen(process.env.PORT || 5000, () => console.log('ABDM PayU Server Live'));
