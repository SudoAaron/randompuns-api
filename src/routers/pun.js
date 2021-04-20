const express = require('express');
const Pun = require('../models/pun');
const adminAuth = require('../middleware/adminAuth');

const router = new express.Router();

router.get('/puns/random', async (req, res) => {
try{
    const puns = await Pun.find({});
    if (!puns) {
        return res.status(404).send();
    }
    const approvedPuns = puns.filter((pun) => {return pun.approved})
    const randomPun = approvedPuns[Math.floor(Math.random() * approvedPuns.length)];
    res.send(randomPun);
} catch (e) {
    res.status(400).send();
}
});

router.get('/puns/:punID', async (req, res) => {
try{
    const pun = await Pun.findById(req.params.punID);
    if (!pun) {
        return res.status(404).send();
    }
    res.send(pun);
} catch (e) {
    res.status(400).send();
}
});

router.get('/puns', async (req, res) => {
    try{
        for (const key in req.query) {
            switch(key) {
                case 'title':
                    const puns = await Pun.find({ title: req.query[key] })
                case 'submittedBy':
                    const puns = Pun.find({ submittedBy: req.query[key] })
                case 'approved':
                    const puns = await Pun.find({ approved: req.query[key] })
                default:
                    const puns = await Pun.find({});
            }
            if (!puns) {
                return res.status(404).send();
            }
        }
        res.send(puns);
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/puns/submit/bulk', async (req, res) => {
    const allowedUpdates = ['title', 'setUp', 'punchline', 'submittedBy']
    const bulkArray = req.body.items;
    let error = {
        "message": '',
        "items": []
    };
    await bulkArray.map(async (item) => {
        const updates = Object.keys(item);
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
        const pun = new Pun(item);
        if(isValidUpdate) {
            await pun.save();
        } else {
            error.message = 'Invalid items sent.'
            error.items.push(item);
        }
    })
    try {
        res.status(201).send({"completed": true, error});
    } catch (e) {
        res.status(400).send({"completed": false, error});
    }
})

router.post('/puns/submit', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'setUp', 'punchline', 'submittedBy']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    const pun = new Pun(req.body);
    if (!pun) {
        return res.status(404).send();
    }
    try {
        if(isValidUpdate) {
            await pun.save();
            res.status(201).send({ pun });
        }
    } catch (e) {
        res.status(400).send();
    }
})

router.patch('/puns/:punID/approve', adminAuth, async (req, res) => {
    try {
        const pun = await Pun.findById(req.params.punID);
        if (!pun) {
            return res.status(404).send();
        }
        pun.approved = true;
        await pun.save();
        res.send(pun);
    } catch (e) {
        res.status(400).send();
    }
})

router.patch('/puns/:punID/like', async (req, res) => {
    try {
        const pun = await Pun.findOne({ _id: req.params.punID });
        if(!pun) {
            return res.status(404).send();
        }
        pun.likes = pun.likes + 1;
        await pun.save();
        res.send(pun);
    } catch (e) {
        res.status(400).send();
    }
})

router.patch('/puns/:punID/dislike', async (req, res) => {
    try {
        const pun = await Pun.findOne({ _id: req.params.punID });
        if(!pun) {
            return res.status(404).send();
        }
        pun.dislikes = pun.dislikes + 1;
        await pun.save();
        res.send(pun);
    } catch (e) {
        res.status(400).send();
    }
})

router.patch('/puns/:punID', adminAuth, async (req, res) => {
    const allowedUpdates = ['title', 'setUp', 'punchline', 'submittedBy']
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update.'});
    }
    try {
        const pun = await Pun.findOne({ _id: req.params.punID });
        if(!pun) {
            return res.status(404).send();
        }
        updates.forEach((update) => pun[update] = req.body[update]);
        await pun.save();
        res.send(pun);
    } catch (e) {
        res.status(400).send();
    }
})

router.delete('/puns/:punID', adminAuth, async (req, res) => {
    try {
        const pun = await Pun.deleteOne({ _id: req.params.punID });
        if (!pun) {
            return res.status(404).send();
        }
        res.send({"completed": true});
    } catch (e) {
        res.status(500).send();
    }
})

router.patch('/puns/approve/bulk', adminAuth, async (req, res) => {
    const bulkArray = req.body.items;

    await bulkArray.map(async (item) => {
        let pun = await Pun.findById(item);
        pun.approved = true;
        await pun.save();
    })
    try {
        res.status(201).send({ "completed": true });
    } catch (e) {
        res.status(400).send({ "completed": false });
    }
});

router.delete('/puns/delete/bulk', adminAuth, async (req, res) => {
    const bulkArray = req.body.items;

    await bulkArray.map(async (item) => {
        await Pun.deleteOne({ _id: item });
    })
    try {
        res.status(201).send({ "completed": true });
    } catch (e) {
        res.status(400).send({ "completed": false });
    }
});

  module.exports = router;