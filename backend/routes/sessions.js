// routes/sessions.js
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const Session = require('../models/Session');
const router = express.Router();

// GET /sessions - public published sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /my-sessions - user's own sessions
router.get('/my-sessions', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /my-sessions/:id - single session
router.get('/my-sessions/:id', auth, async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user });
    if (!session) return res.status(404).json({ msg: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /my-sessions/save-draft
router.post('/my-sessions/save-draft', auth, async (req, res) => {
  const { sessionId, title, tags, json_file_url } = req.body;
  try {
    let session;

    // Validate sessionId if provided
    if (sessionId && !mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ msg: "Invalid sessionId" });
    }

    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(sessionId), user_id: req.user },
        {
          title,
          tags,
          json_file_url,
          updated_at: new Date(),
        },
        { new: true }
      );
    } else {
      // Create new draft
      session = new Session({
        user_id: req.user,
        title,
        tags,
        json_file_url,
        status: 'draft',
      });
      await session.save();
    }

    res.json(session);
  } catch (err) {
    console.error("Draft save error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /my-sessions/publish
router.post('/my-sessions/publish', auth, async (req, res) => {
  const { sessionId } = req.body;
  try {
    const session = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: req.user },
      { status: 'published', updated_at: new Date() },
      { new: true }
    );

    if (!session) return res.status(404).json({ msg: 'Session not found' });

    res.json(session);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
