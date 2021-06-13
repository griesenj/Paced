

// TODO: Using this probably makes the most sense (iterate array and find index at which desired key exists)
const testEntryArrays = [
    {title: "The Legend of Zelda: Majora's Mask",
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
        {run: "100%", splits: [
            { split: 'Sword', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'Escape', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'Bottle', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
            { split: 'Bugs', goldSeg: 200, pbSeg: 200, pbTotal: 500, runSeg: 0, runTotal: 0},
            { split: 'Deku', goldSeg: 250, pbSeg: 250, pbTotal: 750, runSeg: 0, runTotal: 0},
            { split: 'Collapse', goldSeg: 250, pbSeg: 250, pbTotal: 1000, runSeg: 0, runTotal: 0},
            { split: 'Ganon', goldSeg: 300, pbSeg: 300, pbTotal: 1300, runSeg: 0, runTotal: 0 },
        ]},
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg"}
];

const testEntryObjects = [
    {title: "The Legend of Zelda: Majora's Mask",
    category: {
        AnyPercent: [
            { split: 'Sword', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'Escape', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'Bottle', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
            { split: 'Bugs', goldSeg: 200, pbSeg: 200, pbTotal: 500, runSeg: 0, runTotal: 0},
            { split: 'Deku', goldSeg: 250, pbSeg: 250, pbTotal: 750, runSeg: 0, runTotal: 0},
            { split: 'Collapse', goldSeg: 250, pbSeg: 250, pbTotal: 1000, runSeg: 0, runTotal: 0},
            { split: 'Ganon', goldSeg: 300, pbSeg: 300, pbTotal: 1300, runSeg: 0, runTotal: 0 },
        ],
        HundredPercent: [
            { split: 'Sword', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
            { split: 'Escape', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
            { split: 'Bottle', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
            { split: 'Bugs', goldSeg: 200, pbSeg: 200, pbTotal: 500, runSeg: 0, runTotal: 0},
            { split: 'Deku', goldSeg: 250, pbSeg: 250, pbTotal: 750, runSeg: 0, runTotal: 0},
            { split: 'Collapse', goldSeg: 250, pbSeg: 250, pbTotal: 1000, runSeg: 0, runTotal: 0},
            { split: 'Ganon', goldSeg: 300, pbSeg: 300, pbTotal: 1300, runSeg: 0, runTotal: 0 },
        ]
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg"}
];

const otherTest = [
    { split: 'Sword', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
    { split: 'Escape', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
    { split: 'Bottle', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
    { split: 'Bugs', goldSeg: 200, pbSeg: 200, pbTotal: 500, runSeg: 0, runTotal: 0},
    { split: 'Deku', goldSeg: 250, pbSeg: 250, pbTotal: 750, runSeg: 0, runTotal: 0},
    { split: 'Collapse', goldSeg: 250, pbSeg: 250, pbTotal: 1000, runSeg: 0, runTotal: 0},
    { split: 'Ganon', goldSeg: 300, pbSeg: 300, pbTotal: 1300, runSeg: 0, runTotal: 0 },
]