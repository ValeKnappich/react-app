# react-app

## Webengineering Projekt Semester 3

Bestehend aus 4 Tabs, die je ein Minigame enthalten

Jeder hat einen eigenen Branch, sowie ein eigenes Verzeichnis in /src, in dem das MiniGame definiert wird. 
In der App.js bitte nur die imports und das eigene MiniGame im jeweiligen Tab.

### Hilfestellung:

**Zugriff auf Komponenten von anderen Komponenten aus:**

Zugriff auf Kinder von der Elternklasse:   (using ref's)

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

Zugriff auf Eltern von Kind aus:    (using props)

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
**Zustand speichern bei Tabwechsel:**

Wird der Tab gewechselt wird der state des alten Tabs verworfen.
Um dies zu verhindern habe ich in der obersten Komponente eine Objekt "store" angelegt. 
Also falls ihr Zustände (z.B. bei mir das Scoreboard) sichern wollt tut das in der componentDidMount() (Laden des Zustands) und der ComponentWillUnmount() (speichern des Zustands)


### Bewertungskriterien:

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

