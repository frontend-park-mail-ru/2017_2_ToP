import TopComponent from '../TopComponent/TopComponent';
import GameText from '../GameText/GameText';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import RecordPlayer from '../RecordPlayer/RecordPlayer';
import Button from '../Button/Button';

export default class RecordingPage extends TopComponent {
    constructor(data) {
        super('div', {'class': 'recording-page'}, data);
    }

    render() {
        const audio = new AudioPlayer(this.getData());

        this.components = [
            new GameText({
                text: 'Прослушайте фрагмент песни и когда будете готовы, начните его запись.'
            }),
            audio,
            new GameText({
                text: 'Постарайтесь уложиться в 10 секунд.'
            }),
            new RecordPlayer({
                audioPlayer: audio
            }),
            new Button('Отправить', '')
        ];

        this.components.forEach(element => {
            this.append(element.render());
        });

        return this.getElement();
    }
}