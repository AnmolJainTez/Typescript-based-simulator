function addImageAtOrigin(app) {
    app.loader.add('originImage', './images/straight_250_50.jpg').load(() => {
        let image = new PIXI.Sprite(app.loader.resources.originImage.texture);

        // Set the anchor to center the image at the calculated coordinates
        image.anchor.set(0.5);

        // Set position at the center of the screen
        image.x = app.screen.width / 2;
        image.y = app.screen.height / 2;

        // Add the image to the stage
        app.stage.addChild(image);
    });
}
