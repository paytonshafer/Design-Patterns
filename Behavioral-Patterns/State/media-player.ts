// Base State 
abstract class State {
    player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public abstract onLock(): string;
    public abstract onPlay(): string;
    public abstract onNext(): string;
    public abstract onPrevious(): string;
}

// Concrete State
class LockedState extends State{
    public constructor(player: Player) {
        super(player);
        player.setPlaying(false);
    }

    public onLock(): string {
        if (this.player.isPlaying()) {
            this.player.changeState(new ReadyToPlayState(this.player));
            return "Stop playing";
        } else {
            return "Locked...";
        }
    }

    public onPlay(): string {
        this.player.changeState(new ReadyToPlayState(this.player));
        return "Ready";
    }

    public onNext(): string {
        return "Locked...";
    }

    public onPrevious(): string {
        return "Locked...";
    }
}

// Concrete State
class ReadyToPlayState extends State{
    public constructor(player: Player) {
        super(player);
    }

    public onLock(): string {
        this.player.changeState(new LockedState(this.player));
        return "Locked...";
    }

    public onPlay(): string {
        const action = this.player.startPlayback();
        this.player.changeState(new PlayingState(this.player));
        return action;
    }

    public onNext(): string {
        return "Locked...";
    }

    public onPrevious(): string {
        return "Locked...";
    }
}

// Concrete State
class PlayingState extends State{
    public constructor(player: Player) {
        super(player);
    }

    public onLock(): string {
        this.player.changeState(new LockedState(this.player));
        this.player.setCurrentTrackAfterStop();
        return "Stop playing";
    }

    public onPlay(): string {
        this.player.changeState(new ReadyToPlayState(this.player));
        return "Paused...";
    }

    public onNext(): string {
        return this.player.nextTrack();
    }

    public onPrevious(): string {
        return this.player.previousTrack();
    }
}

// Context
class Player{
    private state: State;
    private playing: boolean = false;
    private playlist: string[] = [];
    private currentTrack: number = 0;

    public constructor() {
        this.state = new ReadyToPlayState(this)
        this.setPlaying(true)
        for (let i = 1; i <= 12; i++) {
            this.playlist.push("Track " + i);
        }
    }

    public changeState(state: State): void {
        this.state = state;
    }

    public getState(): State {
        return this.state;
    }

    public setPlaying(bool: boolean){
        this.playing = bool
    }

    public isPlaying(): boolean {
        return this.playing;
    }

    public startPlayback(): string {
        return "Playing " + this.playlist[this.currentTrack];
    }

    public nextTrack(): string {
        this.currentTrack++;
        if (this.currentTrack > this.playlist.length  - 1) {
            this.currentTrack = 0;
        }
        return "Playing " + this.playlist[this.currentTrack];
    }

    public previousTrack(): string {
        this.currentTrack--;
        if (this.currentTrack < 0) {
            this.currentTrack = this.playlist.length - 1;
        }
        return "Playing " + this.playlist[this.currentTrack];
    }

    public setCurrentTrackAfterStop(): void {
        this.currentTrack = 0;
    }
}

// Client code
const demo = () => {
    const player = new Player();

    console.log("Initial state: " + player.getState().constructor['name']);

    console.log('\nPlay in inital state')
    console.log(player.getState().onPlay());

    console.log('\nLock the player')
    console.log(player.getState().onLock());

    console.log('\nPlay in locked state')
    console.log(player.getState().onPlay());

    console.log('\nUnlock the player')
    console.log(player.getState().onLock());

    console.log('\nPlay in ready state')
    console.log(player.getState().onPlay());

    console.log('\nPlay in playing state')
    console.log(player.getState().onPlay());

    console.log('\nNext track in play state')
    console.log(player.getState().onNext());

    console.log('\nLock while in play state')
    console.log(player.getState().onLock());

    console.log('\nLock while in lock state')
    console.log(player.getState().onLock());

    console.log('\nPreviious while in lock state')
    console.log(player.getState().onPrevious());
}

demo()
/* OUTPUT
Initial state: ReadyToPlayState

Play in inital state
Playing Track 1

Lock the player
Stop playing

Play in locked state
Ready

Unlock the player
Locked...

Play in ready state
Ready

Play in playing state
Playing Track 1

Next track in play state
Playing Track 2

Lock while in play state
Stop playing

Lock while in lock state
Locked...

Previious while in lock state
Locked...
*/