# react-app

<--     Webengineering Projekt Semester 3    -->

Bestehend aus 4 Tabs, die je ein Minigame enthalten

Jeder hat einen eigenen Branch, sowie ein eigenes Verzeichnis in /src, in dem das MiniGame definiert wird. 
In der App.js bitte nur die imports und das eigene MiniGame im jeweiligen Tab.

Hilfestellung:

Zugriff von Komponenten von anderen Komponenten aus:

Zugriff auf Kinder von der Elternklasse:   (using ref's)

class Elternklasse extends Component{
  constructor(){
    this.meinKind = React.createRef();
  }
  irgendNeMethode(){
    this.meinKind.current.methodeImKind();
  }
}

Zugriff auf Eltern von Kind aus:

class Elternklasse extends Component{
  render(){
    return (
      <meinKind ich={this} /> //Verweis auf die Elternkomponente
      <meinKind meineMethode={this.meineMethode} /> //Verweis auf eine Methode der Elternklasse
    );
  }
}
class Kinderklasse extends Component{
  irgendNeMethode(){
     this.props.meineMethode();    //Zugriff via this.props.NAME_DES_CUSTOM_ATTRIBUTS
  }
}
