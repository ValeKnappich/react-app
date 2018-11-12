import React, {Component} from 'react';
import './PaulsMiniGame.css';
import rr from './funny_bot.gif';


const FIELDS = 9; // Definiert Anzahl der Spielfelder

/* Es gibt 3 Spielmodi:
Wenn window.scenarioFlag = 0 ist, dann ist es der Modus 2-Player
Wenn window.scenarioFlag = 1 ist, dann ist es normal der Modus 1-Player(You start). Nur wenn man Button 1-Player(crazy Robot starts) clickt, befindet man sich stattdessen in diesem Modus*/
window.scenarioFlag = 1;

//Für Button um Spiel zu reseten(ist für Fallunterscheidung vonnötten, damit man danach nicht auf ein falschen Spielmodus zurücksetzt)
window.scenarioFlagPlayAgain = 1;

// Definiert wer am Zug ist. Nur relevant bei 2
window.playerOnTurn = 1; // Definiert wer am Zug ist. Nur relevant im Modus 2-Player. Bei den anderen beiden Modi ist man immer O


//Enthält Hauptkomponente, die exportiert wird und somit am Bildschirm ausgegeben wird
class PaulsMiniGame extends Component {
    render() {
        return (
            <Container/>
        );
    }
}

export default PaulsMiniGame;


// Klasse, die das gesamte Spiel enthält
class Container extends React.Component {
    constructor(attributes) {
        super(attributes);
        //Die 3 weiteren Felder werden für die 3-Spielmodibuttons verwendet
        let tempFields = new Array(FIELDS + 3);
        //initialisierung des arrays, damit es als state "übertragen" werden kann. Initialisierung mit -1, da dies bedeutetm dass das Feld frei ist
        for (let i = 0; i < 13; i++) {
            tempFields[i] = -1;
        }
        //macht die 13 Felder zu states, mit denen dauerhaft gearbeitet, sozusagen, das Herzstück des Codes darstellen
        this.state = {
            fields: tempFields,
        };

    }

    //sorgt für die Darstellung des Felds und dafür, dass es befüllt werden kann. Sorgt auch dafür, dass es nicht befüllt werden kann, wenn jemand gewonnen hat
    //Der Parameter i bestimmt, welches Feld angeklickt wurde.
    // Unterscheidet ob, man im Modus 2-Player ist oder gegen den Computer spielt
    // Das eigentliche Beschreiben des Felds über den State wird auf die Funktion action() ausgelagert im 2-Player Modus oder auf actionKI(), falls man gegen den Computer spielt
    inputFields(i) {

        //lokale Kopie von den States erstellen, da dies best practice ist
        let fieldValue = this.state.fields[i];
        //damit in den leeren Feldern nicht -1 steht, erhalten diese für die Darstellung den Wert "undefined"
        if (fieldValue === -1)
            fieldValue = undefined;

        //verhindert das Beschreiben von Feldern, wo bereits X oder O gesetzt wurde
        let tempFields = new Array(FIELDS + 3);
        for (let i = 0; i < 13; i++) {
            tempFields[i] = this.state.fields[i];
        }
        if (!(tempFields[i] === -1)) {
            return (
                <button className="button2"
                >{fieldValue}
                </button>
            );
        }

        //sorgt dafür, dass wenn jemand gewonnen hat,  man keine weiteren Felder beschreiben kann
        if (this.result(tempFields) === "X wins" || this.result(tempFields) === "O wins"
            || this.result(tempFields) === "You lose xD" || this.result(tempFields) === "You win QQ") {
            return (
                <button className="button2"
                >{fieldValue}
                </button>
            );
        }

        //Wird aufgerufen im Modus 2-PLayer
        if (window.scenarioFlag === 0) {
            return (
                <button className="button2"
                        onClick={() => this.action(i)}
                >{fieldValue}
                </button>
            );
        }

        //Wird aufgerufen wenn man gegen Bot spielt
        if (window.scenarioFlag === 1) {
            return (
                <button className="button2"
                        onClick={() => this.actionKI(i)}
                >{fieldValue}
                </button>
            );
        }
    }

    //sorgt für die Darstellung des Buttons 2-Player und ruft die Funktion this.reset() bei klick auf, die diesen Modus einleitet
    inputModeField1() {
        return (
            <Mode1
                id="mode1"
                onClick={() => this.mode1()}
            >2-Player
            </Mode1>
        );
    }

    //sorgt für die Darstellung des Buttons 1-Player (Crazy Robot starts) und ruft die Funktion this.Mode2() bei klick auf, die diesen Modus einleutet
    inputModeField2() {
        return (
            <Mode2
                onClick={() => this.mode2()}
            >
            </Mode2>
        );
    }

    //sorgt für die Darstellung des Buttons 1-Player (You start) und ruft die Funktion this.Mode3() bei klick auf, die diesen Modus einleutet
    inputModeField3() {
        return (
            <Mode3
                onClick={() => this.mode3()}
            >
            </Mode3>
        );
    }

    //wird genutzt um das Spiel zurückzusetzen
    inputModeField4() {
        return (
            <Reset
                id="reset"
                onClick={() => this.reset()}
            >play again
            </Reset>
        );
    }

    //wird durch klicken des Button eingeleitet  und leitet neues Spiel im Modus 2-Player ein
    mode1() {
        //alle Felder auf -1 setzen
        let tempFields = new Array(FIELDS + 3);
        for (let i = 0; i < 13; i++) {
            tempFields[i] = this.state.fields[i];
        }
        for (let i = 0; i < 10; i++) {
            tempFields[i] = -1
        }
        this.setState({
            fields: tempFields,
        });
        //flags entsprechend anpassen
        window.playerOnTurn = 0;
        window.scenarioFlag = 0;
        // Button des aktiven Spielmodus highlighten
        document.getElementById("mode1").style.backgroundColor = "khaki";
        document.getElementById("mode2").style.backgroundColor = "buttonface";
        document.getElementById("mode3").style.backgroundColor = "buttonface";
    }


    //wird durch klick des  Button eingeleitet  und leitet  neues Spiel im Modus 1-Player (Crazy Robot starts) ein
    mode2() {
        //alle Felder auf -1 setzen
        let tempFields = new Array(FIELDS + 3);
        for (let i = 0; i < 13; i++) {
            tempFields[i] = this.state.fields[i];
        }
        for (let i = 0; i < 10; i++) {
            tempFields[i] = -1
        }
        this.setState({
            fields: tempFields,
        });
        //flags entsprechend anpassen
        window.playerOnTurn = 1;
        //durch dieses setzen im "Voraus" wird dafür gesorgt, dass der Computer anfängt
        tempFields[4] = 'X';
        window.scenarioFlag = 1;
        window.scenarioFlagPlayAgain=0;
        // Button des aktiven Spielmodus highlighten
        document.getElementById("mode1").style.backgroundColor = "buttonface";
        document.getElementById("mode2").style.backgroundColor = "khaki";
        document.getElementById("mode3").style.backgroundColor = "buttonface";
    }

    //wird durch klick des  Button eingeleitet  und leitet  neues  Spiel im Modus 1-Player  (You start) ein
    mode3() {
        //alle Felder auf -1 setzen
        let tempFields = new Array(FIELDS + 3);
        for (let i = 0; i < 13; i++) {
            tempFields[i] = this.state.fields[i];
        }
        for (let i = 0; i < 10; i++) {
            tempFields[i] = -1
        }
        this.setState({
            fields: tempFields,
        });
        //flags entsprechend anpassen
        window.playerOnTurn = 1;
        window.scenarioFlag = 1;
        window.scenarioFlagPlayAgain=1;
        // Button des aktiven Spielmodus highlighten
        document.getElementById("mode1").style.backgroundColor = "buttonface";
        document.getElementById("mode2").style.backgroundColor = "buttonface";
        document.getElementById("mode3").style.backgroundColor = "khaki";
    }

    //wird durch klick des  reset-Buttons eingeleitet  und setzt Spiel zurück(dafür wird einfach die passende Funktion des Spielmodi aufgerufen)
    reset() {
        if(window.scenarioFlag === 0)
        {
            this.mode1();
            return;
        }
        if(window.scenarioFlag === 1 && window.scenarioFlagPlayAgain===0)
        {
            this.mode2();
            return;
        }
        if(window.scenarioFlag === 1 && window.scenarioFlagPlayAgain===1)
        {
            this.mode3();
        }
    }


    //befüllt das Spielfeld im Modus 2-PLayer. Je nachdem welcher Spieler am Zug ist, wird X oder O gesetzt. Danach wird window.playerOnTurn umgeändert, dass im nächsten Zug der andere sein Zeichen machen kann
    action(i) {
        let tempFields = new Array(FIELDS + 3);
        for (let i = 0; i < 13; i++) {
            tempFields[i] = this.state.fields[i];
        }
        if (window.playerOnTurn === 0) {
            tempFields[i] = 'X';
            window.playerOnTurn = 1;
        }
        else {
            tempFields[i] = 'O';
            window.playerOnTurn = 0;
        }
        //übertragen der Eingabe in den state
        this.setState({
            fields: tempFields,
        });
    }

    //befüllt das Spielfeld im Modus 1-Player(You start) und 1-Player(crazy computer starts). Selber setzt man immer O. Der Computer immer X
    actionKI(i) {
        let tempFields = new Array(FIELDS + 3);
        for (let i = 0; i < 13; i++) {
            tempFields[i] = this.state.fields[i];
        }
        //setzen der eigenen Eingabe
        tempFields[i] = 'O';
        this.setState({
            fields: tempFields,
        });

        if (this.result(tempFields) === "X wins" || this.result(tempFields) === "O wins"
            || this.result(tempFields) === "You lose xD" || this.result(tempFields) === "You win QQ") {
            return;
        }

        //ab hier wird ein passendes Feld für den Computer gesucht und dann gesetzt
        // aufrufen der Funktion estimateBestField. mit diesen Parametern ermittelt sie, ob es ein Feld gibt, mit dem der Computer direkt gewinnen kann
        let a = estimateBestField(tempFields, 'X', 'X', -1);
        //wurde ein Feld gefunden, wird es nun gesetzt und die funktion beendet
        if (a > 0) {
            tempFields[a] = 'X';
            this.setState({
                fields: tempFields,
            });
            return;
        }

        // wurde oben kein passendes feld gefunden, wird die Funktion estimateBestField erneut aufgerufen. mit diesen Parametern ermittelt sie, ob es ein Feld gibt, mit dem der Spieler direkt gewinnen kann und setzt dort einen eigens Zeichen, damit der Spieler nicht gewinnt
        let b = estimateBestField(tempFields, 'O', 'O', -1);
        if (b > 0) {
            tempFields[b] = 'X';
            this.setState({
                fields: tempFields,
            });
            return;
        }

        //konnte beim Aufruf der Funktion über die beiden oben genannten Fälle, kein Feld gefunden werden. Wird nun erneut die Funktion aufgerufen. Nun wird überprüft, ob man eine zweier Kette aufzubauen kann, die für einen späteren Gewinn genutzt werden kann
        let c = estimateBestField(tempFields, 'X', -1, -1);
        if (c > 0) {
            tempFields[c] = 'X';
            this.setState({
                fields: tempFields,
            });
            return;
        }

        //Wenn in den obigen Fällen kein Feld gefunden wird, wird einfach das nächste freie Feld befüllt
        let p = 0;
        while (!(tempFields[p] === -1)) {
            p++;
            if (p > 8) break;
        }
        tempFields[p] = 'X';

        this.setState({
            fields: tempFields,
        });
    }

    //Findet über window.playerOnTurn heraus wer am Zug ist und gibt einen Text dazu aus, der später gerendert wird
    nextPlayer() {
        let tempFields = new Array(FIELDS + 3);
        for (let i = 0; i < 13; i++) {
            tempFields[i] = this.state.fields[i];
        }
        if (this.result(tempFields))
            return;
        if (window.playerOnTurn === 1 && window.scenarioFlag === 1) {
            return "You are O. It is your turn";
        }
        if (window.playerOnTurn === 0) {
            return "It is X his turn";
        }
        if (window.playerOnTurn === 1) {
            return "It is O his turn";
        }

    }


    //Alle Gewinnmöglichkeiten sind in dieser Funktion eingespeichert. Sobald eine erreicht ist, ist das Spiel beendet und es wird über einen Text der Gewinner zurückgegeben
    // Ermittelt auch, ob keine Züge mehr möglich sind und somit ein Patt vorliegt
    // Wenn man gegen den Computer spielt wird ein anderer Text zurückgegeben
    result(tempFields2) {
        let tempFields = tempFields2;
        if ((tempFields[0] === 'X' && tempFields[1] === 'X' && tempFields[2] === 'X')
            || (tempFields[6] === 'X' && tempFields[7] === 'X' && tempFields[8] === 'X')
            || (tempFields[0] === 'X' && tempFields[3] === 'X' && tempFields[6] === 'X')
            || (tempFields[1] === 'X' && tempFields[4] === 'X' && tempFields[7] === 'X')
            || (tempFields[2] === 'X' && tempFields[5] === 'X' && tempFields[8] === 'X')
            || (tempFields[3] === 'X' && tempFields[4] === 'X' && tempFields[5] === 'X')
            || (tempFields[0] === 'X' && tempFields[4] === 'X' && tempFields[8] === 'X')
            || (tempFields[2] === 'X' && tempFields[4] === 'X' && tempFields[6] === 'X')) {
            if (window.scenarioFlag === 1) {
                return "You lose xD";
            }
            return "X wins";
        }

        if ((tempFields[0] === 'O' && tempFields[1] === 'O' && tempFields[2] === 'O')
            || (tempFields[3] === 'O' && tempFields[4] === 'O' && tempFields[5] === 'O')
            || (tempFields[0] === 'O' && tempFields[3] === 'O' && tempFields[6] === 'O')
            || (tempFields[1] === 'O' && tempFields[4] === 'O' && tempFields[7] === 'O')
            || (tempFields[2] === 'O' && tempFields[5] === 'O' && tempFields[8] === 'O')
            || (tempFields[6] === 'O' && tempFields[7] === 'O' && tempFields[8] === 'O')
            || (tempFields[0] === 'O' && tempFields[4] === 'O' && tempFields[8] === 'O')
            || (tempFields[2] === 'O' && tempFields[4] === 'O' && tempFields[6] === 'O')) {
            if (window.scenarioFlag === 1) {
                return "You win QQ";
            }
            return "O wins";
        }

        if ((tempFields[0] !== -1 && tempFields[1] !== -1 && tempFields[2] !== -1)
            && (tempFields[3] !== -1 && tempFields[4] !== -1 && tempFields[5] !== -1)
            && (tempFields[6] !== -1 && tempFields[7] !== -1 && tempFields[8] !== -1)
        ) {
            if (window.scenarioFlag === 1) {
                return "Nobody wins -  Cannot beat me, cannot beat me, lalalalalalala";
            }
            return "Nobody wins. Congrats Nobody";
        }
    }

    //Diese Funktion rendert alles und sorgt somit für die Ausgabe. Sie sorgt auch dafür, dass bei jeder Änderung an der Ausgabe, dies sofort auf der WEbseite angezeigt wird
    render() {
        //Feld wird über einen Table aufgebaut. Dieser wird über 3 arrays zusammengepusht. Könnte theoretisch leicht skaliert weden
        let arraybuilder2 = [];
        let arraybuilder1 = [];
        let fieldOutput = []; // die ist das letzte, sprich das Ausgabearray

        for (let i = 0; i < FIELDS / 3; i++) {
            arraybuilder1.push(<td className="tables">
                {this.inputFields(i * 3)}
            </td>)
            arraybuilder1.push(<td className="tables">
                {this.inputFields(i * 3 + 1)}
            </td>)
            arraybuilder1.push(<td className="tables">
                {this.inputFields(i * 3 + 2)}
            </td>)

            arraybuilder2.push(<tr className="tables">{arraybuilder1}</tr>);
            arraybuilder1 = [];
        }

        //fieldOutput enthält nun das gesamte Spielfeld
        fieldOutput.push(<table className="tables">{arraybuilder2}</table>);

        //Zusammenbauen von den 3 Spieldmodi-Buttons + Resetbuttons zu einem Feld
        let ModeButtons = [];
        ModeButtons.push(<div>
            <div>{this.inputModeField4(12)}{this.inputModeField1(9)} {this.inputModeField2(10)} {this.inputModeField3(11)}</div>
        </div>)

        //Ermittlung wer am Zug ist und ob jemand gewonnen hat. Ausgabe ob jemand gewonnen hat, erfolgt nur, wenn das Spielt beendet ist - in diesem Fall wird auch nicht mehr ausgegeben, wer am Zug ist
        let tempFields = new Array(FIELDS + 3);
        for (let i = 0; i < 13; i++) {
            tempFields[i] = this.state.fields[i];
        }
        let result = this.result(tempFields)
        let nextPlayer = this.nextPlayer();

        //gif wird ausgegeben, wenn man gegen den PC verliert oder patt spielt
        let gifAfterGame = [];
        if (result === "You lose xD" || result === "Nobody wins -  Cannot beat me, cannot beat me, lalalalalalala")
            gifAfterGame.push(<img className="image" src={rr} alt="logo"/>);

        //Rückgabe der tatsächlichen Ausgabe
        return (<div className="PaulsBody">
            <h1 className="Paulh1">Tic-Tac-Toe</h1>
            <div> {fieldOutput}</div>
            <div className="textResult">{result}</div>
            <div className="textNextPlayer">{nextPlayer}</div>
            <div className="positionModeButtons"><br/>{ModeButtons}<br/></div>
            {gifAfterGame}
        </div>);
    }
}


//über diese Funktion wird ein passendes Feld ermittelt. Der Parameter tempFields2 ist eine Kopie des aktuellen Felds.
//Die 3 Token werden genutzt um verschiedene Szenarien aufzubauen. Sprich ist  token='X' und token2 = 'X' und der token3 ='-1' werden alle möglichen Möglichkeiten
// durchitiert und nach so einem Szenario gesucht. Sobald es gefunden wurde, wird das zu befüllende Feld zurückgegeben (so ein Feld würde zu einem Gewinn führen).
// Sucht man mit token='X' und token2 = '-1' und der token3 ='-1' so sucht man z.B. nach einem 'X' belegten Feld, wo eine 3er Kette für einen Sieg noch aufgebaut werden kann (auch wenn zwei Möglichkeitne bestehen, wird nur ein Feld zurückgegeben.)
// wird kein passendes Feld gefunden, wird "-1" zurückgegeben und es ist bekannt, dass es ein Feld unter dem Szenario nicht vorhanden ist
function estimateBestField(tempFields2, token, token2, token3) {
    let j = 0;
    let tempFields = tempFields2;
    if (tempFields[4] === -1) {
        return 4;
    }
    while (true) {
        if (tempFields[j] === token && tempFields[j + 1] === token2 && tempFields[j + 2] === token3) {
            return (j + 2);
        }
        j = j + 3;
        if (j === 9)
            break;
    }

    j = 0;
    while (true) {
        if (tempFields[j] === token && tempFields[j + 2] === token2 && tempFields[j + 1] === token3) {
            return j + 1;
        }
        j = j + 3;
        if (j === 9)
            break;
    }

    j = 0;
    while (true) {
        if (tempFields[j + 1] === token && tempFields[j + 2] === token2 && tempFields[j] === token3) {
            return j;
        }
        j = j + 3;
        if (j === 9)
            break;
    }

    j = 0;
    while (true) {
        if (tempFields[j] === token && tempFields[j + 3] === token2 && tempFields[j + 6] === token3) {
            return j + 6;
        }
        j++;
        if (j === 3)
            break;
    }

    j = 3;
    while (true) {
        if (tempFields[j] === token && tempFields[j + 3] === token2 && tempFields[j - 3] === token3) {
            return j - 3;
        }
        j++;
        if (j === 6)
            break;
    }

    j = 6;
    while (true) {
        if (tempFields[j] === token && tempFields[j - 6] === token2 && tempFields[j - 3] === token3) {
            return j - 3;
        }
        j++;
        if (j === 9)
            break;
    }

    if (tempFields[0] === token && tempFields[4] === token2 && tempFields[8] === token3) {
        return 8;
    }
    if (tempFields[4] === token && tempFields[8] === token2 && tempFields[0] === token3) {
        return 0;
    }
    if (tempFields[0] === token && tempFields[8] === token2 && tempFields[4] === token3) {
        return 4;
    }
    if (tempFields[2] === token && tempFields[4] === token2 && tempFields[6] === token3) {
        return 6;
    }
    if (tempFields[2] === token && tempFields[6] === token2 && tempFields[4] === token3) {
        return 4;
    }
    if (tempFields[6] === token && tempFields[4] === token2 && tempFields[2] === token3) {
        return 2;
    }
    return -1;
}

//Klassenbaustein für den Spielmodus 2-Player
class Mode1 extends React.Component {
    render() {
        return (
            <div
                className="general"
            >
                <button
                    id="mode1"
                    onClick={() => this.props.onClick()}
                >
                    2-Player
                </button>
            </div>
        );
    }
}

//Klassenbaustein für den Spielmodus  1-Player (Crazy Robot starts)
class Mode2 extends React.Component {
    render() {
        return (
            <div
                className="general"
            >
                <button
                    id="mode2"
                    onClick={() => this.props.onClick()}
                >
                    1-Player (Crazy Robot starts)
                </button>
            </div>
        );
    }
}

//Klassenbaustein für den Spielmodus  1-Player (You start)
class Mode3 extends React.Component {
    render() {
        return (
            <div
                className="general"
            >
                <button
                    id="mode3"
                    onClick={() => this.props.onClick()}
                >
                    1-Player (You start)
                </button>
            </div>

        );
    }
}

//Klassenbaustein um den aktiven Spielmodus zurückzusetzen
class Reset extends React.Component {
    render() {
        return (
            <div
                className="general"
            >
                <button
                    id="reset"
                    onClick={() => this.props.onClick()}
                >
                   reset
                </button>
            </div>

        );
    }
}
