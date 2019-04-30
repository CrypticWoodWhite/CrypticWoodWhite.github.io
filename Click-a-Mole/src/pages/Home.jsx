import React, { Component } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Scores from "../components/Scores";
import Image from "../components/Image";
import {Container, Row, Column} from "../components/Grid";
import Footer from "../components/Footer/Footer";
import {mole1, mole2, mole3, mole4, mole5, mole6, mole7, mole8, mole9, mole10, mole11, mole12, mole13, mole14, mole15, mole16} from "../img/imagesIndex";

class Index extends Component {

    state = {
        ImgOne: "",
        ImgTwo: "",
        ImgThree: "",
        ImgFour: "",
        ImgFive: "",
        ImgSix: "",
        ImgSeven: "",
        ImgEight: "",
        ImgNine: "",
        ImgTen: "",
        ImgEleven: "",
        ImgTwelve: "",
        ImgThirteen: "",
        ImgFourteen: "",
        ImgFifteen: "",
        ImgSixteen: "",
        clickedImgArr: [],
        currentScore: 0,
        allScores: [], // hmmmm might want to put scores in a db
        topScore: 0
    };

    componentDidMount () {
        this.loadImages();
    };

    // function to randomize image location
    randomize = (array) => {
        let i = array.length,
            j = 0,
            temp;
    
        while (i > 0) {
            j = Math.floor(Math.random() * (i+1));
            i--;
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        };

        this.setState({
            ImgOne: array[0],
            ImgTwo: array[1],
            ImgThree: array[2],
            ImgFour: array[3],
            ImgFive: array[4],
            ImgSix: array[5],
            ImgSeven: array[6],
            ImgEight: array[7],
            ImgNine: array[8],
            ImgTen: array[9],
            ImgEleven: array[10],
            ImgTwelve: array[11],
            ImgThirteen: array[12],
            ImgFourteen: array[13],
            ImgFifteen: array[14],
            ImgSixteen: array[15]
        });
    };

    loadImages = () => {
        let imgArray = [mole1, mole2, mole3, mole4, mole5, mole6, mole7, mole8, mole9, mole10, mole11, mole12, mole13, mole14, mole15, mole16];
        this.randomize(imgArray);
    };

    handleImgClick = event => {
        event.preventDefault();

        let imgArray = [mole1, mole2, mole3, mole4, mole5, mole6, mole7, mole8, mole9, mole10, mole11, mole12, mole13, mole14, mole15, mole16];

        let clickedImg = event.target.id;
        let clickedImgArr = this.state.clickedImgArr;

        let currentScore = this.state.currentScore;
        let allScores = this.state.allScores;

        if (clickedImgArr.length < 16) {

            if (clickedImgArr.includes(clickedImg)) {
                alert("You already clicked that mole! Starting over");
                clickedImgArr.length = 0;
                currentScore = 0;
                this.randomize(imgArray);
                allScores.push(this.state.currentScore);

            } else {
                clickedImgArr.push(clickedImg);
                currentScore++;
                this.randomize(imgArray);
            };

        } else if (clickedImgArr.length === 16) {
            alert("You're the ultimate winner! You got the best score possible! Let's see if you can do it again!");
            clickedImgArr.length = 0;
            this.randomize(imgArray);
        };

        allScores.sort();
        allScores.reverse();
        let topScore = allScores[0];

        this.setState({
            currentScore: currentScore,
            allScores: allScores,
            topScore: topScore
        });
    };

    ////

    render () {
        return (
            <div>
            <Container>

                <Header>
                    <h1 className="title">Click-a-Mole</h1>
                    <h5>This is the memory game version of Whack-a-Mole. The moles get shuffled around after each click. Try to not click on the same mole twice. The highest score possible is 16. Click a mole to get started!</h5>
                </Header>

                <Nav>
                    <Scores>
                        Current Score: {this.state.currentScore}
                    </Scores>
                    <Scores>
                        Top Score: {this.state.topScore}
                    </Scores>
                </Nav>

                <Row idNumber="row-one">

                    <Column idNumber="col-one">
                        <Image
                            idString={this.state.ImgOne}
                            src={this.state.ImgOne}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    <Column idNumber="col-two">
                        <Image
                            idString={this.state.ImgTwo}
                            src={this.state.ImgTwo}
                            onClick={this.handleImgClick}
                        />           
                    </Column>
                    <Column idNumber="col-three">
                        <Image
                            idString={this.state.ImgThree}
                            src={this.state.ImgThree}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    <Column idNumber="col-four">
                        <Image
                            idString={this.state.ImgFour}
                            src={this.state.ImgFour}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    
                </Row>

                <Row idNumber="row-two">

                    <Column idNumber="col-five">
                        <Image
                            idString={this.state.ImgFive}
                            src={this.state.ImgFive}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    <Column idNumber="col-six">
                        <Image
                            idString={this.state.ImgSix}
                            src={this.state.ImgSix}
                            onClick={this.handleImgClick}
                        />           
                    </Column>
                    <Column idNumber="col-seven">
                        <Image
                            idString={this.state.ImgSeven}
                            src={this.state.ImgSeven}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    <Column idNumber="col-eight">
                        <Image
                            idString={this.state.ImgEight}
                            src={this.state.ImgEight}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    
                </Row>

                <Row idNumber="row-three">

                    <Column idNumber="col-nine">
                        <Image
                            idString={this.state.ImgNine}
                            src={this.state.ImgNine}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    <Column idNumber="col-ten">
                        <Image
                            idString={this.state.ImgTen}
                            src={this.state.ImgTen}
                            onClick={this.handleImgClick}
                        />           
                    </Column>
                    <Column idNumber="col-eleven">
                        <Image
                            idString={this.state.ImgEleven}
                            src={this.state.ImgEleven}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    <Column idNumber="col-twelve">
                        <Image
                            idString={this.state.ImgTwelve}
                            src={this.state.ImgTwelve}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    
                </Row>

                <Row idNumber="row-four">

                    <Column idNumber="col-thirteen">
                        <Image
                            idString={this.state.ImgThirteen}
                            src={this.state.ImgThirteen}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    <Column idNumber="col-fourteen">
                        <Image
                            idString={this.state.ImgFourteen}
                            src={this.state.ImgFourteen}
                            onClick={this.handleImgClick}
                        />           
                    </Column>
                    <Column idNumber="col-fifteen">
                        <Image
                            idString={this.state.ImgFifteen}
                            src={this.state.ImgFifteen}
                            onClick={this.handleImgClick}
                        />
                    </Column>
                    <Column idNumber="col-sixteen">
                        <Image
                            idString={this.state.ImgSixteen}
                            src={this.state.ImgSixteen}
                            onClick={this.handleImgClick}
                        />
                    </Column>

                </Row>

            </Container>

            <Footer></Footer>

            </div>
        )
    };

}

export default Index;