import TopComponent from '../TopComponent/TopComponent';
import GameText from '../GameText/GameText';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import RecordPlayer from '../RecordPlayer/RecordPlayer';

export default class RecordingPage extends TopComponent {
    constructor(data) {
        super('div', { 'class': 'recording-page' }, data);
    }

    render() {
        this.components = [new GameText({
            text: 'Добро пожаловать!'
        }),
        new GameText({
            text: 'Прослушайте фрагмент и когда будете готовы, начните его запись'
        }),
        new AudioPlayer(this.getData()),
        new RecordPlayer()];
        this.components.forEach(element => {
            this.append(element.render());
        });
        return this.getElement();
    }
}