
export interface SuggestionContext {
    recipientName: string;
    occasion: string;
}

export const getHeroTitleSuggestions = ({ recipientName, occasion }: SuggestionContext) => {
    const name = recipientName || "[Name]";
    const occ = occasion?.toLowerCase() || "";

    if (occ.includes("birthday")) {
        return [
            `Happy Birthday, ${name}!`,
            `Celebrating You, ${name}`,
            `${name}'s Special Day`,
            `Cheers to Another Year!`,
            `Make a Wish, ${name}!`
        ];
    } else if (occ.includes("anniversary")) {
        return [
            `Happy Anniversary, ${name}!`,
            `To My Forever Person`,
            `Celebrating Us`,
            `Years of Love`,
            `Still the One`
        ];
    } else if (occ.includes("valentine") || occ.includes("love")) {
        return [
            `Happy Valentine's Day!`,
            `For You, With Love`,
            `You're My Favorite`,
            `To My Everything`,
            `Love You Always`
        ];
    } else if (occ.includes("graduation")) {
        return [
            `Congrats, Grad!`,
            `The Future is Yours`,
            `So Proud of You, ${name}`,
            `Class of '24!`,
            `Dream Big!`
        ];
    } else if (occ.includes("friend")) {
        return [
            `To My Bestie`,
            `Partners in Crime`,
            `Friendship Goals`,
            `Thanks for Being You`,
            `Better Together`
        ];
    }

    // Generic / Just Because
    return [
        `For You, ${name}`,
        `You're Amazing!`,
        `A Little Surprise`,
        `Just Because`,
        `Thinking of You`
    ];
};

export const getHeroSubtitleSuggestions = ({ recipientName, occasion }: SuggestionContext) => {
    const occ = occasion?.toLowerCase() || "";

    if (occ.includes("birthday")) return ["Hope your day is as amazing as you are", "Another year wiser, another year cooler", "Let the celebrations begin!"];
    if (occ.includes("anniversary")) return ["Here's to many more years together", "Every moment with you is a gift", "Love you more with each passing day"];
    if (occ.includes("graduation")) return ["Your hard work paid off!", "The world is waiting for you", "Onwards and upwards!"];

    return [
        "Something special just for you",
        "Made with love",
        "Here's to you!",
        "A gift from the heart"
    ];
};

export const getHeroMessageSuggestions = ({ recipientName }: SuggestionContext) => {
    const name = recipientName || "you";
    return [
        `Welcome to your special website, ${name}! I created this just for you.`,
        `Hey ${name}! I wanted to make something unique to celebrate you.`,
        `${name}, you mean so much to me. This website is a small token of my appreciation.`,
        `I hope this brings a smile to your face, ${name}. You deserve all the happiness!`
    ];
};

export const getLetterBodySuggestions = ({ recipientName, occasion }: SuggestionContext) => {
    const name = recipientName || "[Name]";
    const occ = occasion?.toLowerCase() || "";

    if (occ.includes("birthday")) {
        return [
            `Happy Birthday! I hope this year brings you endless joy and amazing adventures. You're such an incredible person and I'm so grateful to have you in my life.`,
            `Wishing you the happiest of birthdays! May all your dreams come true this year. Thank you for being such an amazing friend/partner.`,
            `Another trip around the sun! You just keep getting better. Have the best celebration ever!`
        ];
    } else if (occ.includes("anniversary")) {
        return [
            `Happy Anniversary! Every moment with you is a treasure. Thank you for all the beautiful memories we've created together.`,
            `To my favorite person in the world. Life is just better with you by my side. Here’s to us and our beautiful journey.`,
            `I love you more than words can say. Thank you for being my rock, my joy, and my best friend.`
        ];
    } else if (occ.includes("valentine")) {
        return [
            `Happy Valentine's Day! You make every day feel like a special occasion. I'm so lucky to call you mine.`,
            `Roses are red, violets are blue, I'm so incredibly lucky to have you!`,
            `Just wanted to remind you how much you are loved today and every day.`
        ];
    } else if (occ.includes("graduation")) {
        return [
            `Congratulations on your graduation! We are so incredibly proud of you and can't wait to see all the amazing things you'll achieve.`,
            `You did it! All that hard work has paid off. Go out there and conquer the world!`,
            `This is just the beginning of your amazing journey. Belief in yourself as much as we believe in you.`
        ];
    }

    // Generic
    return [
        `I wanted to create something special for you to show how much I care. I hope this brings a smile to your face!`,
        `You're such an incredible person, and I wanted to celebrate that. Thank you for being you!`,
        `Just a little something to brighten your day and remind you how awesome you are.`
    ];
};

export const getLetterSignatureSuggestions = () => {
    return ["With love", "Forever yours", "Warmest wishes", "Yours truly", "Always", "Best friends forever"];
};

// --- Dynamic Template Questions Suggestions ---
// This handles generic string inputs for other templates if needed

export const getSuggestionForField = (templateId: string, fieldId: string, context: SuggestionContext) => {
    // Basic mapping for common fields across templates if standard naming is used
    // Or specific per template
    const { recipientName } = context;

    if (templateId === 'music' && fieldId === 'spotifyUrl') {
        return []; // No text suggestions for URL
    }

    // Fallback generic positive messages
    return [
        `I love this about you, ${recipientName}!`,
        `This reminds me of us.`,
        `Such a great memory!`
    ];
}
