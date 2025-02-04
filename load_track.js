function addImageAtOrigin(app) {
    app.loader
        .add('originImage', './images/straight_250_50.jpg')
        .add('originImage1', './images/curved_250_200.png')
        .load(() => {
            // Load and position the first image
            let image1 = new PIXI.Sprite(app.loader.resources.originImage.texture);
            image1.anchor.set(0.5);
            image1.x = app.screen.width / 2;
            image1.y = app.screen.height / 2;

            // Load and position the second image
            let image2 = new PIXI.Sprite(app.loader.resources.originImage1.texture);
            image2.anchor.set(0.5);
            image2.x = app.screen.width / 2;
            image2.y = app.screen.height / 2;

            // Add both images to the stage
            app.stage.addChild(image1);
            app.stage.addChild(image2);
        });
}
