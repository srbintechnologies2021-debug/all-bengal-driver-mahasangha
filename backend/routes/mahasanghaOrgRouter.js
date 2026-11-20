const express = require("express");
const router = express.Router();

const ALLOWED_PILLARS = new Set([
  "DRIVER_WELFARE",
  "DIGITAL_MEMBERSHIP",
  "LEGAL_SUPPORT",
  "EMERGENCY_HELP",
  "ORGANIZATION_NEWS",
  "DRIVER_TRAINING",
  "INSURANCE_SOCIAL_WELFARE",
]);

// GET /api/v1/mahasangha/organization - Organization & SRBIN 24/7 context
router.get("/organization", (req, res) => {
  return res.status(200).json({
    ok: true,
    organization: "All Bengal Driver Mahasangha",
    partner: "SRBIN TECHNOLOGIES OPC PRIVATE LIMITED",
    address: "Paschim Medinipur, Kharagpur, West Bengal 721126, India",
    serviceArea: "Debra, West Bengal, India",
    supportHours: "24/7",
    designSystem: {
      style: "Organization + Glassmorphism",
      primary: "#5C49BF",
      darkSlate: "#25223E",
      secondary: "#CBB5E2",
      surface: "#F9F9FC",
    },
  });
});

// POST /api/v1/mahasangha/support-request - Validated hotfix endpoint
router.post("/support-request", async (req, res) => {
  try {
    const pillar =
      typeof req.body?.pillar === "string"
        ? req.body.pillar.trim().toUpperCase()
        : "DRIVER_WELFARE";
    const memberName =
      typeof req.body?.memberName === "string" ? req.body.memberName.trim() : "";

    if (!ALLOWED_PILLARS.has(pillar)) {
      return res.status(422).json({
        ok: false,
        code: "INVALID_PILLAR",
        allowedPillars: Array.from(ALLOWED_PILLARS),
      });
    }

    if (memberName.length < 2) {
      return res.status(422).json({
        ok: false,
        code: "INVALID_MEMBER_NAME",
        message: "Member name must be at least 2 characters.",
      });
    }

    return res.status(201).json({
      ok: true,
      ticketId: `ABDM-ORG-${Date.now()}`,
      pillar,
      memberName,
      status: "QUEUED",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      code: "INTERNAL_ERROR",
      message: "Failed to create organization support request.",
    });
  }
});

module.exports = router;
