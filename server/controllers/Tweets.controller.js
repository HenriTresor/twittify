
        // console.log('likedd')
        res.status(201).json({ status: true, message: 'like added successfully' })
    } catch (error) {
        console.log("error liking tweet", error.message)
        next(errorResponse(500, 'unexpected error occurred'))
    }
}