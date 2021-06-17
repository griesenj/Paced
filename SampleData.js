export const sampleData =  [
    {title: "The Legend of Zelda: Majora's Mask",
    category: [
        {run: 'Any%', splits: [
            { split: 'MM Any% 1', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'MM Any% 2', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'MM Any% 3', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
        ]},
        {run: "100%", splits: [
            { split: 'MM Hundo 1', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'MM Hundo 2', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'MM Hundo 3', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
        ]},
        {run: "All Masks", splits: [
            { split: 'Mask 1', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'Mask 2', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'Mask 3', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
        ]},
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg"},
    {title: "The Legend of Zelda: Ocarina of Time",
    category: [
        {run: 'Any%', splits: [
            { split: 'Sword', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'Escape', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'Bottle', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
            { split: 'Bugs', goldSeg: 200, pbSeg: 200, pbTotal: 500, runSeg: 0, runTotal: 0},
            { split: 'Deku', goldSeg: 250, pbSeg: 250, pbTotal: 750, runSeg: 0, runTotal: 0},
            { split: 'Collapse', goldSeg: 250, pbSeg: 250, pbTotal: 1000, runSeg: 0, runTotal: 0},
            { split: 'Ganon', goldSeg: 300, pbSeg: 300, pbTotal: 1300, runSeg: 0, runTotal: 0 },
        ]},
        {run: "All Cows", splits: [
            { split: 'Moo 1', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'Moo 2', goldSeg: 50, pbSeg: 50, pbTotal: 100, runSeg: 0, runTotal: 0},
            { split: 'Moo 3', goldSeg: 50, pbSeg: 50, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'MOO!', goldSeg: 50, pbSeg: 50, pbTotal: 200, runSeg: 0, runTotal: 0},
        ]},
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Legend_of_Zelda_Ocarina_of_Time_box_art.png"},
    {title: "The Legend of Zelda: The Wind Waker",
    category: [
        {run: 'Any%', splits: [
            { split: 'WW Any% 1', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'WW Any% 2', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'WW Any% 3', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},            
        ]},
        {run: "100%", splits: [
            { split: 'WW Hundo 1', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'WW Hundo 2', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'WW Hundo 3', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},            
        ]},
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/The_Legend_of_Zelda_The_Wind_Waker.jpg/220px-The_Legend_of_Zelda_The_Wind_Waker.jpg"},
];

    // const [games, setGames] = useState([
    //     {title: "The Legend of Zelda: Majora's Mask", imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg"},
    //     {title: "The Legend of Zelda: Ocarina of Time", imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Legend_of_Zelda_Ocarina_of_Time_box_art.png"},
    //     {title: "The Legend of Zelda: The Wind Waker", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/The_Legend_of_Zelda_The_Wind_Waker.jpg/220px-The_Legend_of_Zelda_The_Wind_Waker.jpg"},
    //     {title: "Banjo Kazooie", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/12/Banjo_Kazooie_Cover.png'},
    //     {title: "Banjo Tooie", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/41/Banjo-Tooie_Coverart.png' },
    //     {title: "Super Mario 64", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg'},
    //     {title: "Super Mario Sunshine", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/78/Super_mario_sunshine.jpg'},
    //     {title: "Super Metroid", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Smetroidbox.jpg'},
    //     {title: "Celeste", imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Celeste_box_art_final.png/800px-Celeste_box_art_final.png'}
    // ]);