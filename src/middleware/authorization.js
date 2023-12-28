const authorization = roleArray => {
    return async (req, res, next) => {
        try {
            if (!req.user) return res.status(401).json({ status: 'error', error: 'Unauthorized' });
            if (!roleArray.includes(req.user.role.toUpperCase())) return res.status(403).json({ status: 'error', error: 'Not permissions' });
            next();
        } catch (error) {
            console.log(error);
        }
    };
};

export default authorization;
