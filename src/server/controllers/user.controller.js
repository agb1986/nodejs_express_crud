module.exports = {
    getUser: (req, res) => {
        res.send({
            hello: 'API/USER/GET',
        });
    },

    putUser: (req, res) => {
        res.send({
            hello: 'API/USER/PUT',
        });
    },

    deleteUser: (req, res) => {
        res.send({
            hello: 'API/USER/DELETE',
        });
    },
};
