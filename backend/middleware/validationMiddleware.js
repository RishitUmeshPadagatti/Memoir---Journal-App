export const validateJournalEntry = (req, res, next) => {
    const { title, description } = req.body;
  

    if (!description || description.trim() === '') {
      return res.status(400).json({ 
        message: 'Description is required and cannot be empty' 
      });
    }

    if (title && title.length > 100) {
      return res.status(400).json({ 
        message: 'Title cannot exceed 100 characters' 
      });
    }
  
    if (description.length > 10000) {
      return res.status(400).json({ 
        message: 'Description cannot exceed 10,000 characters' 
      });
    }

    req.body.title = title ? title.trim() : '';
    req.body.description = description.trim();
  
    next();
  };
  
  