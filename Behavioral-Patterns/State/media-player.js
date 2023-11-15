var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Base State 
var State = /** @class */ (function () {
    function State(player) {
        this.player = player;
    }
    return State;
}());
// Concrete State
var LockedState = /** @class */ (function (_super) {
    __extends(LockedState, _super);
    function LockedState(player) {
        var _this = _super.call(this, player) || this;
        player.setPlaying(false);
        return _this;
    }
    LockedState.prototype.onLock = function () {
        if (this.player.isPlaying()) {
            this.player.changeState(new ReadyToPlayState(this.player));
            return "Stop playing";
        }
        else {
            return "Locked...";
        }
    };
    LockedState.prototype.onPlay = function () {
        this.player.changeState(new ReadyToPlayState(this.player));
        return "Ready";
    };
    LockedState.prototype.onNext = function () {
        return "Locked...";
    };
    LockedState.prototype.onPrevious = function () {
        return "Locked...";
    };
    return LockedState;
}(State));
// Concrete State
var ReadyToPlayState = /** @class */ (function (_super) {
    __extends(ReadyToPlayState, _super);
    function ReadyToPlayState(player) {
        return _super.call(this, player) || this;
    }
    ReadyToPlayState.prototype.onLock = function () {
        this.player.changeState(new LockedState(this.player));
        return "Locked...";
    };
    ReadyToPlayState.prototype.onPlay = function () {
        var action = this.player.startPlayback();
        this.player.changeState(new PlayingState(this.player));
        return action;
    };
    ReadyToPlayState.prototype.onNext = function () {
        return "Locked...";
    };
    ReadyToPlayState.prototype.onPrevious = function () {
        return "Locked...";
    };
    return ReadyToPlayState;
}(State));
// Concrete State
var PlayingState = /** @class */ (function (_super) {
    __extends(PlayingState, _super);
    function PlayingState(player) {
        return _super.call(this, player) || this;
    }
    PlayingState.prototype.onLock = function () {
        this.player.changeState(new LockedState(this.player));
        this.player.setCurrentTrackAfterStop();
        return "Stop playing";
    };
    PlayingState.prototype.onPlay = function () {
        this.player.changeState(new ReadyToPlayState(this.player));
        return "Paused...";
    };
    PlayingState.prototype.onNext = function () {
        return this.player.nextTrack();
    };
    PlayingState.prototype.onPrevious = function () {
        return this.player.previousTrack();
    };
    return PlayingState;
}(State));
// Context
var Player = /** @class */ (function () {
    function Player() {
        this.playing = false;
        this.playlist = [];
        this.currentTrack = 0;
        this.state = new ReadyToPlayState(this);
        this.setPlaying(true);
        for (var i = 1; i <= 12; i++) {
            this.playlist.push("Track " + i);
        }
    }
    Player.prototype.changeState = function (state) {
        this.state = state;
    };
    Player.prototype.getState = function () {
        return this.state;
    };
    Player.prototype.setPlaying = function (bool) {
        this.playing = bool;
    };
    Player.prototype.isPlaying = function () {
        return this.playing;
    };
    Player.prototype.startPlayback = function () {
        return "Playing " + this.playlist[this.currentTrack];
    };
    Player.prototype.nextTrack = function () {
        this.currentTrack++;
        if (this.currentTrack > this.playlist.length - 1) {
            this.currentTrack = 0;
        }
        return "Playing " + this.playlist[this.currentTrack];
    };
    Player.prototype.previousTrack = function () {
        this.currentTrack--;
        if (this.currentTrack < 0) {
            this.currentTrack = this.playlist.length - 1;
        }
        return "Playing " + this.playlist[this.currentTrack];
    };
    Player.prototype.setCurrentTrackAfterStop = function () {
        this.currentTrack = 0;
    };
    return Player;
}());
// Client code
var demo = function () {
    var player = new Player();
    console.log("Initial state: " + player.getState().constructor['name']);
    console.log('\nPlay in inital state');
    console.log(player.getState().onPlay());
    console.log('\nLock the player');
    console.log(player.getState().onLock());
    console.log('\nPlay in locked state');
    console.log(player.getState().onPlay());
    console.log('\nUnlock the player');
    console.log(player.getState().onLock());
    console.log('\nPlay in ready state');
    console.log(player.getState().onPlay());
    console.log('\nPlay in playing state');
    console.log(player.getState().onPlay());
    console.log('\nNext track in play state');
    console.log(player.getState().onNext());
    console.log('\nLock while in play state');
    console.log(player.getState().onLock());
    console.log('\nLock while in lock state');
    console.log(player.getState().onLock());
    console.log('\nPreviious while in lock state');
    console.log(player.getState().onPrevious());
};
demo();
