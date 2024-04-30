let show _request =
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Gift List</title>
        <style>
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }

    h1 {
        text-align: center;
    }

    .gift-input {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        box-sizing: border-box;
    }

    #submit-btn {
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    #submit-btn:hover {
        background-color: #45a049;
    }

    html {
      height: 100%;
      background: linear-gradient(#123 30%, #667);
      overflow: hidden;
      color: white;
    }

    .snow, .snow:before, .snow:after {
      z-index: -100;
      position: absolute;
      top: -600px;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: radial-gradient(4px 4px at 64px 560px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 310px 295px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 280px 279px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 65px 478px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 87px 485px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 377px 201px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 44px 306px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 166px 483px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 277px 460px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 87px 380px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 35px 292px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 467px 259px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 310px 551px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 511px 363px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 489px 377px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 294px 9px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 64px 267px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 455px 356px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 73px 446px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 153px 523px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 239px 93px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 186px 546px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 141px 216px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 588px 496px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 497px 32px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 151px 568px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 227px 309px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 172px 354px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 282px 437px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 78px 211px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 360px 332px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 590px 126px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 279px 424px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 434px 430px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 505px 52px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 105px 257px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 217px 22px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 69px 159px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 266px 12px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 248px 62px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 396px 212px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 579px 442px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 397px 98px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 355px 555px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 447px 347px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 422px 306px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 534px 528px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 44px 555px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 302px 76px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 211px 375px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 114px 145px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 553px 303px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 451px 411px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 315px 515px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 296px 97px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 142px 274px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 69px 119px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 579px 290px, white 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 525px 261px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 102px 29px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 400px 121px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 342px 299px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 412px 76px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 460px 123px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 457px 589px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 476px 245px, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0)), radial-gradient(5px 5px at 244px 203px, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0)), radial-gradient(4px 4px at 74px 175px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 105px 128px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 434px 426px, rgba(255, 255, 255, 0.7) 50%, rgba(0, 0, 0, 0));
      background-size: 600px 600px;
      animation: snow 3s linear infinite;
      content: "";
    }

    .snow:after {
      margin-left: -200px;
      opacity: 0.4;
      animation-duration: 6s;
      animation-direction: reverse;
      filter: blur(3px);
    }

    .snow:before {
      animation-duration: 9s;
      animation-direction: reverse;
      margin-left: -300px;
      opacity: 0.65;
      filter: blur(1.5px);
    }

    @keyframes snow {
      to {
        transform: translateY(600px);
      }
    }
        </style>
    </head>
    <body>
        <h1>My Gift List</h1>

        <form id="gift-form" method="POST" action="/">
            <label for="gift1">Gift 1 :</label>
            <input type="text" name="gift1" class="gift-input" placeholder="Enter your first gift" autofocus>

            <label for="gift2">Gift 2 :</label>
            <input type="text" name="gift2" class="gift-input" placeholder="Enter your second gift">

            <label for="gift3">Gift 3 :</label>
            <input type="text" name="gift3" class="gift-input" placeholder="Enter your third gift">

            <label for="gift4">Gift 4 :</label>
            <input type="text" name="gift4" class="gift-input" placeholder="Enter your fourth gift">

            <label for="gift5">Gift 5 :</label>
            <input type="text" name="gift5" class="gift-input" placeholder="Enter your fifth gift">

            <button type="submit" id="submit-btn">Prepare my letter!</button>
        </form>

        <div class="snow"></div>
    </body>
    </html>
