import ImagePaths from '../../images'
import Answers from '../../answers'

const checkRightAnswer = (answer, truth) => {
    if (answer.trim().toLowerCase() === truth.trim().toLowerCase()){
        return true
    }
    return false
}
const Routes = (app) => {
    app.route('/')
        .get(function (req, res) {
            const stage = parseInt(req.query.stage)
            const results = {image: ImagePaths[stage].image, label:ImagePaths[stage].label }
            res.json(results);
        })
        .post(function (req, res) {
            const answer = req.body.answer
            const stage = parseInt(req.body.stage)
            if (checkRightAnswer(answer, Answers[stage])) {
                res.json({result: "Correct"});
            } else {
                res.json({result: "Incorrect"});
            }
            
        })
}

export default Routes