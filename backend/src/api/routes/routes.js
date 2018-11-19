import Riddles from '../../riddles/riddles'

const checkRightAnswer = (answer, truth) => {
    if (answer.trim().toLowerCase() === truth.trim().toLowerCase()){
        return true
    }
    return false
}
const Routes = (app) => {
    app.route('/')
        .get(function (req, res) {
            const results = {image: Riddles[0].image, label:Riddles[0].label }
            res.json(results);
        })
        .post(function (req, res) {
            const answer = req.body.answer
            const stage = parseInt(req.body.stage)
            if (checkRightAnswer(answer, Riddles[stage])) {
                if (stage === Riddles.length - 1){
                    res.json({result: "Finish"});
                } else {
                    const next_stage = {image: Riddles[stage + 1].image, label:Riddles[stage + 1].label }
                    res.json({result: "Correct", next_stage});
                }
            } else {
                res.json({result: "Incorrect"});
            }
            
        })
}

export default Routes