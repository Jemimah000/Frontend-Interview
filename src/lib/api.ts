import { Blog, CreateBlogInput, Genre } from '@/types/blog';

// Mock data for demonstration
const mockAuthors = [
  {
    id: '1',
    name: 'Elena Blackwood',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Bestselling author of psychological thrillers. Her works explore the darkest corners of the human mind.'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'Award-winning horror writer known for atmospheric tales that linger long after the last page.'
  },
  {
    id: '3',
    name: 'Isabella Rose',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    bio: 'Romance novelist whose stories capture the essence of love in its most passionate forms.'
  },
  {
    id: '4',
    name: 'James Sterling',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    bio: 'Former military strategist turned action writer. His stories pulse with adrenaline.'
  },
];

let mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Whisper in the Shadows',
    description: 'A detective discovers that the serial killer she\'s hunting might be closer than she thinks...',
    content: `The rain drummed against the window of Detective Sarah Morgan's office, each drop a whisper of secrets yet to be revealed. She stared at the case files spread across her desk—five victims, all connected by invisible threads she couldn't quite grasp.

"Another sleepless night?" Detective James Park appeared at her door, two cups of coffee in hand.

Sarah accepted the offering gratefully. "The killer's pattern... there's something I'm missing. Something personal."

The photographs haunted her: each victim posed with a single white lily, their eyes forever frozen in an expression that wasn't quite fear—it was recognition.

"They knew their killer," she muttered, the realization striking like lightning.

James leaned closer, studying the images. "You think it's someone in their inner circle?"

"No." Sarah's voice dropped to a whisper. "I think it's someone in ours."

The office suddenly felt smaller, the shadows deeper. Every colleague became a suspect, every friendly face a potential mask. As she looked up at James, she noticed something she'd never seen before—a small scar behind his left ear, identical to the mark found on each victim.

The rain continued its relentless percussion, drowning out the sound of her racing heart.`,
    coverImage: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&h=500&fit=crop',
    genre: 'suspense',
    author: mockAuthors[0],
    createdAt: '2024-01-15',
    readTime: 8
  },
  {
    id: '2',
    title: 'Midnight at Ravenswood Manor',
    description: 'When the clock strikes twelve, the dead rise to tell their stories...',
    content: `The invitation arrived on a moonless night, written in ink that seemed to shift and writhe under candlelight. "You are cordially invited to Ravenswood Manor. Attendance is not optional."

Thomas had always been a skeptic, dismissing ghost stories as childish fantasies. But as he stood before the ancient gates, something primal stirred in his chest—a warning from ancestors who knew better than to ignore such summons.

The manor loomed against the starless sky, its windows like hollow eyes watching his approach. With each step up the crumbling stone path, the temperature dropped, until his breath formed ghostly clouds before him.

The door creaked open before he could knock.

"We've been waiting for you," whispered a voice from the darkness within. "For exactly one hundred years."

Thomas stepped inside, and the door slammed shut behind him. In the grand foyer, illuminated by a thousand flickering candles, stood figures in Victorian dress—transparent, ethereal, and very much aware of his presence.

"You're the last of the Thornwood bloodline," said a specter who might once have been a beautiful woman. "The one who can finally set us free... or condemn us for eternity."

The grandfather clock began to chime midnight, and with each toll, the ghosts grew more solid, more desperate, more terrifying.`,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=500&fit=crop',
    genre: 'horror',
    author: mockAuthors[1],
    createdAt: '2024-01-12',
    readTime: 10
  },
  {
    id: '3',
    title: 'Letters from Paris',
    description: 'Two strangers connected by handwritten letters discover that love knows no distance...',
    content: `The first letter arrived on a Tuesday, tucked between bills and advertisements like a secret waiting to be discovered. The handwriting was elegant, the paper faintly scented with lavender.

"Dear Stranger,

I found your address in a book I purchased from a shop near the Seine. If you're reading this, perhaps fate has something to say to both of us. I am sitting at Café de Flore, watching the rain paint silver streaks on the window, wondering about the person who will hold this paper.

Tell me—do you believe in serendipity?

Yours curiously,
Margot"

Sophia read the letter three times before replying. What began as curiosity blossomed into something she hadn't expected—a connection that transcended the 5,000 miles between New York and Paris.

Week after week, their letters grew longer, more intimate. They shared fears and dreams, heartbreaks and hopes. Margot described the way spring sunlight filtered through the Luxembourg Gardens. Sophia wrote about the energy of Times Square at midnight.

"I've never told anyone this," Margot's latest letter read, "but I feel like you know me better than people I see every day. Is it strange to fall for someone through words alone?"

Sophia held the paper to her heart, knowing her response would change everything:

"Meet me at the Eiffel Tower. One month from today. I'll be carrying a book—the same one that started all of this."`,
    coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop',
    genre: 'romance',
    author: mockAuthors[2],
    createdAt: '2024-01-10',
    readTime: 7
  },
  {
    id: '4',
    title: 'The Last Extraction',
    description: 'A retired special ops soldier must complete one final mission to save his kidnapped daughter...',
    content: `The phone call came at 3 AM, shattering the fragile peace Jack Morrison had built over five years of civilian life.

"We have your daughter." The voice was electronically distorted, inhuman. "You have 48 hours. The Volkov files for her life."

Jack's blood ran cold. The Volkov files—documents that could topple governments, documents he'd risked everything to bury. Documents that were supposed to be his ticket out of the shadow world forever.

"If you hurt her—"

"Save the threats for someone who doesn't know your reputation, Ghost." A laugh, sharp and cruel. "We'll be in touch."

The line went dead. Jack stood motionless for three heartbeats, then the soldier awakened—the part of him he'd tried so hard to forget. He moved to the hidden panel behind his bookshelf, revealing an arsenal that would make a small army jealous.

Within an hour, he'd traced the call to an abandoned warehouse in the Port of Los Angeles. But this was too easy. They wanted him to come.

As he loaded his weapons and strapped on his tactical vest, memories flooded back: Jakarta, Moscow, the missions that cost him his humanity. He'd sworn never again.

But for his daughter? He'd burn the world.

"They want the Ghost?" Jack muttered, checking his rifle's scope. "They're going to get the Ghost."`,
    coverImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=500&fit=crop',
    genre: 'action',
    author: mockAuthors[3],
    createdAt: '2024-01-08',
    readTime: 9
  },
  {
    id: '5',
    title: 'The Double Agent',
    description: 'Trust no one. Not even yourself. A spy thriller that will keep you guessing until the final page.',
    content: `Agent Natasha Volkov had three rules: Never trust your handler. Never fall in love. Never question your orders.

She'd already broken two of them.

"The asset is compromised," her earpiece crackled. "Abort the mission."

But she didn't move. Across the crowded Moscow ballroom, Viktor Kozlov raised his champagne glass in a silent toast. He knew. Somehow, he always knew.

"I said abort, Nightingale." Director Hayes's voice sharpened. "That's a direct order."

"Since when do I follow orders?" Natasha whispered, her lips barely moving as she smiled at a passing diplomat. "Besides, Viktor and I have unfinished business."

Three years of deep cover, three years of living a lie so perfectly that she'd almost forgotten what was real. Viktor had been her mark, her mission, her biggest mistake. And now, according to intercepted intelligence, he was planning to sell nuclear codes to the highest bidder.

She crossed the dance floor, every step calculated, every smile a weapon. When Viktor took her hand, she felt the familiar electricity—and the cold metal of a gun pressed against her ribs.

"Did you really think I wouldn't figure it out, my love?" he murmured, pulling her close for what looked like an intimate dance. "The CIA should have sent someone better."

"Who says I'm still working for the CIA?"

Viktor's confident smile flickered. For the first time, doubt crept into his eyes.

This was going to be a long night.`,
    coverImage: 'https://images.unsplash.com/photo-1606116669915-e946e0e82b69?w=800&h=500&fit=crop',
    genre: 'thriller',
    author: mockAuthors[0],
    createdAt: '2024-01-05',
    readTime: 11
  },
  {
    id: '6',
    title: 'Summer in Santorini',
    description: 'A chance encounter on a Greek island leads to a love story written in the stars...',
    content: `The sunset over Santorini painted the sky in shades of rose and gold, colors that Ellie had only seen in dreams. She sat alone at a cliffside taverna, nursing a glass of local wine and nursing a broken heart.

"Is this seat taken?"

She looked up to find warm brown eyes and an apologetic smile. The stranger was tall, sun-kissed, with the kind of easy confidence that came from a life well-lived.

"It's a free country," she replied, then winced at her own coldness. "Sorry. Bad day. Bad year, actually."

"I know the feeling." He sat down, ordering two more glasses of wine without asking. "I'm Andreas. I come here to think when life gets complicated."

"Ellie. And I came here to run away from complications."

"How's that working out?"

She laughed despite herself—the first real laugh in months. "Ask me again in a week."

What started as shared wine became shared stories. Andreas was a marine biologist studying the local underwater caves. Ellie was a burnt-out architect escaping a failed engagement and a life that never felt like her own.

Day after day, they explored the island together. He showed her hidden beaches only locals knew. She sketched buildings while he dove for specimens. Somewhere between the blue domes and the endless sea, walls began to crumble.

"I leave in three days," she said one evening, her voice breaking.

Andreas took her hand, his thumb tracing circles on her palm. "Then we have three days to decide if this is goodbye or just the beginning."`,
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=500&fit=crop',
    genre: 'romance',
    author: mockAuthors[2],
    createdAt: '2024-01-03',
    readTime: 8
  },
];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // GET /blogs - Get all blogs
  getBlogs: async (): Promise<Blog[]> => {
    await delay(800);
    return [...mockBlogs].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  // GET /blogs/:id - Get blog by ID
  getBlogById: async (id: string): Promise<Blog | null> => {
    await delay(500);
    return mockBlogs.find(blog => blog.id === id) || null;
  },

  // POST /blogs - Create a new blog
  createBlog: async (input: CreateBlogInput): Promise<Blog> => {
    await delay(1000);
    const author = mockAuthors.find(a => a.id === input.authorId) || mockAuthors[0];
    
    const newBlog: Blog = {
      id: String(Date.now()),
      title: input.title,
      description: input.description,
      content: input.content,
      coverImage: input.coverImage,
      genre: input.genre,
      author,
      createdAt: new Date().toISOString().split('T')[0],
      readTime: Math.ceil(input.content.split(' ').length / 200)
    };
    
    mockBlogs = [newBlog, ...mockBlogs];
    return newBlog;
  },

  // Get authors for the form
  getAuthors: async () => {
    await delay(300);
    return mockAuthors;
  }
};
