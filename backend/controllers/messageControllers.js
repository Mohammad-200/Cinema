const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Please provide a valid message" });
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "userName pic email");
    res.status(201).json(message); // return the message

    // const latestMessages = await Message.find()
    //   .sort({ createdAt: 1 })
    //   .limit(50)
    //   .populate("sender", "userName email pic");
    // res.status(201).json({ latestMessages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createAt: 1 })
      .populate("sender", "userName email pic");

    if (!messages) {
      res.status(400).json({ message: "No messages to display" });
    }

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Couldn't fetch the messages" });
  }
};

module.exports = { sendMessage, getMessages };
