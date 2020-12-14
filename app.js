requirejs.config({
    baseUrl: 'src/lib',
    path: {
        app: "src"
    },
});

requirejs(['src/game.js']);