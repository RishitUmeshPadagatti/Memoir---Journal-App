import OpenAI from 'openai';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const createJournalEntry = async (req, res) => {
  try {
    const { description, bookmark } = req.body;
    const userId = req.user.id;

    const aiTitle = await generateDailyReflectionTitle();

    const newJournal = await prisma.journals.create({
      data: {
        title: aiTitle,
        description,
        authorId: userId,
        bookmark: bookmark === 'true'
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

export async function generateDailyReflectionTitle(req,res) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system", 
          content: "You are a thoughtful AI that generates introspective and meaningful daily journal prompts. Create a single, thought-provoking question that encourages deep personal reflection."
        },
        {
          role: "user", 
          content: "Generate a unique, insightful daily journal prompt that helps someone explore their inner thoughts, emotions, or personal growth."
        }
      ],
      max_tokens: 20,
      temperature: 0.7
    });

    return res.send(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating AI title:', error);

    return res.send("What did you do today?");
  }
}