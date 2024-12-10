import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createJournalEntry = async (req, res) => {
  try {
    const { title, description, bookmark } = req.body;
    const userId = req.user.id; // Assuming authentication middleware adds user info

    const newJournal = await prisma.journals.create({
      data: {
        title: title || '',
        description: description,
        authorId: userId,
        bookmark: bookmark || false
      },
      select: {
        id: true,
        title: true,
        description: true,
        created: true,
        authorId: true,
        bookmark: true
      }
    });

    res.status(201).json({
      message: 'Journal entry created successfully',
      journal: newJournal
    });
  } catch (error) {
    console.error('Error creating journal entry:', error);
    res.status(500).json({ 
      message: 'Failed to create journal entry',
      error: error.message || 'Unknown error'
    });
  }
};

export const getJournalEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, bookmark } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const whereCondition = { authorId: userId };
    if (bookmark !== undefined) {
      whereCondition.bookmark = bookmark === 'true';
    }

    const totalEntries = await prisma.journals.count({ where: whereCondition });
    const journals = await prisma.journals.findMany({
      where: whereCondition,
      skip: skip,
      take: limitNum,
      orderBy: { created: 'desc' }
    });

    res.status(200).json({
      journals,
      currentPage: pageNum,
      totalPages: Math.ceil(totalEntries / limitNum),
      totalEntries
    });
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ 
      message: 'Failed to fetch journal entries',
      error: error.message || 'Unknown error'
    });
  }
};

export const updateJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, bookmark } = req.body;
    const userId = req.user.id;

    // First, verify the journal belongs to the user
    const existingJournal = await prisma.journals.findUnique({
      where: { id, authorId: userId }
    });

    if (!existingJournal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    const updatedJournal = await prisma.journals.update({
      where: { id, authorId: userId },
      data: {
        title: title || existingJournal.title,
        description: description || existingJournal.description,
        bookmark: bookmark !== undefined ? bookmark : existingJournal.bookmark
      }
    });

    res.status(200).json({
      message: 'Journal entry updated successfully',
      journal: updatedJournal
    });
  } catch (error) {
    console.error('Error updating journal entry:', error);
    res.status(500).json({ 
      message: 'Failed to update journal entry',
      error: error.message || 'Unknown error'
    });
  }
};

export const deleteJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // First, verify the journal belongs to the user
    const existingJournal = await prisma.journals.findUnique({
      where: { id, authorId: userId }
    });

    if (!existingJournal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    await prisma.journals.delete({
      where: { id, authorId: userId }
    });

    res.status(200).json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({ 
      message: 'Failed to delete journal entry',
      error: error.message || 'Unknown error'
    });
  }
};

export const getSingleJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const journal = await prisma.journals.findUnique({
      where: { 
        id, 
        authorId: userId 
      }
    });

    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.status(200).json(journal);
  } catch (error) {
    console.error('Error fetching single journal entry:', error);
    res.status(500).json({ 
      message: 'Failed to fetch journal entry',
      error: error.message || 'Unknown error'
    });
  }
};


