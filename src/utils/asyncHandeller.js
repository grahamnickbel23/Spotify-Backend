// this a js method to be used to avoid writinh try - catch again and again
const asymcHandeller = (fnc, purpous) => async (req, res, next) => {

    try{
        // execute the requested function
        await fnc(req, res, next);

    }catch (err){
        return res.status(500).json({
            success: false,
            message: `error in ${purpous}`,
            error: err.message
        })
    }
}

export { asymcHandeller }