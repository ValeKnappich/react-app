# React-App: Webengineering Projekt Semester 3

Bestehend aus 4 Tabs, die je ein Minigame enthalten

Jeder hat einen eigenen Branch, sowie ein eigenes Verzeichnis in /src, in dem das MiniGame definiert wird. 
In der App.js bitte nur die imports und das eigene MiniGame im jeweiligen Tab.

## Hilfestellungen:

### Zugriff auf Komponenten von anderen Komponenten aus:

**Zugriff auf Kinder von der Elternklasse:   (using ref's)**

```javascript
class Elternklasse extends Component{
  constructor(){
    this.meinKind = React.createRef();
  }
  render(){
     return(
        <meinKind ref={this.meinKind}/>
     );
  }
  irgendNeMethode(){
    this.meinKind.current.methodeImKind();    //Wichtig: current
  }
}
```

**Zugriff auf Eltern von Kind aus:    (using props)**

```javascript
class Elternklasse extends Component{
  render(){
    return (
      <meinKind ich={this} /> //Verweis auf die Elternkomponente
      //ODER
      <meinKind meineMethode={this.meineMethode} /> //Verweis auf eine Methode der Elternklasse
    );
  }
}
class Kinderklasse extends Component{
  irgendNeMethode(){
     this.props.meineMethode();    //Zugriff via this.props.NAME_DES_CUSTOM_ATTRIBUTS
  }
}
```
### Zustand speichern bei Tabwechsel:

Wird der Tab gewechselt wird der state des alten Tabs verworfen.
Um dies zu verhindern habe ich in der obersten Komponente eine Objekt "store" angelegt. In diesem Objekt existiert wiederum ein Objekt 'vale', ihr könnt euch gerne auch eins anlegen, falls ihr das wollt.
Falls ihr Zustände (z.B. bei mir das Scoreboard) sichern wollt tut das in der componentDidMount() (Laden des Zustands) und der ComponentWillUnmount() (speichern des Zustands)

z.B.
```javascript
class meineKomponenteDieGespeichertWerdenSoll extends Component{
  componentWillUnmount(){
    this.props.parent.store.vale.scoreboard = this.state;
  }
  componentDidMount(){
    this.setState(this.props.store.vale.scoreboard);
  }
}
```
### Popups

Ich habe eine Popup-Komponente erstellt. Diese liegt in dem Ordner 'SharedComponents' und kann über die Funktion openPopup() gerendert werden. 
```javascript
openPopup(message, buttons, input);
z.B. 
openPopup("Dies ist ein tolles Popup\nmit Zeilenumbrüchen", [["ButtonText1",()=>{console.log("onClick des buttons")}],["ButtonText2",()=>{...}]], true;

message: String       Nachricht, die über das Popup angezeigt wird (Zeilenumbruch durch \n)

buttons: 2D-Array     Definiert, welche und wie viele Buttons im Popup sein sollen. 
                      Schema:   [["button1Text",onclick1Function],["button2Text",onclick2Function]]
                      
input: boolean        default: false. Entscheidet, ob ein Eingabefeld im Popup sein soll. 
                      Zugriff auf den Inhalt z.B. über document.getElementById('popup_input').value
```

## Bewertungskriterien:

**Programmcode		20%**

| Kriterium | Gewichtung |
|-----------|------------|
|Verzeichnisse|2%|
|Dateistruktur|			3%|
|Kommentare|			2%|
|Formatierung|			2%|
|Gliederung|			6%|
|Programmiertechnik|	3%|
|Verständlichkeit|		3%|

**Funktionen			25%**

| Kriterium | Gewichtung |
|-----------|------------|
|Verwendung ext APIs|	6%|
|Validierung|	3%|
|Sicherheit|3%|
|Dynamik|				5%|
|Fehler vorhanden	|	8%|

**Design				5%**

| Kriterium | Gewichtung |
|-----------|------------|
|Browserkompatibilität|	1%|
|Seitenaufbau|			2%|
|Benutzbarkeit|			1%|
|Hilfetexte|				1%|

**Präsentationen		50%**

| Kriterium | Gewichtung |
|-----------|------------|
|Selbsttudium I|			25%|
|Selbsttudium II|		25%|

