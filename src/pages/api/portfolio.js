import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, title, avatar, skills, email, location, socialLinks, userId, bio } = req.body;


    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { userId: userId },
    });

    if (existingPortfolio) {
      return res.status(400).json({ error: 'A portfolio with this user ID already exists.' });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        name: name || '',
        title: title || '',
        avatar: avatar || '',
        skills: skills || [],
        email: email || '',
        socialLinks: socialLinks || {},
        userId: userId || '',
        bio: bio || '',
      },
    });

    res.status(201).json(portfolio);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}