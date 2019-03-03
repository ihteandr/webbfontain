// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Timer } from '../../utils/timer';
import { TimeFormatter } from '../../utils/formatter';
import { Input, Button } from '../../components';
import { Locations } from '../../constants';
import './home.styles.scss';

type Result = {
    name: string,
    avgSpeed: number,
    endSpeed: number,
    complete: number,
}

type Props = {
    words: Array<string>,
    isLoading: boolean,
    fetchWords: () => Promise<any>,
    name: string,
    saveResult: (Result) => Promise<any>,
    logout: () => *,
};

type State = {
    mode: 'wait' | 'process',
    completed: Array<string>,
    speeds: Array<number>,
    displayWords: Array<string>,
    time: number,
};

export default class HomeView extends Component<Props, State> {
    static contextTypes = {
        changeLocation: PropTypes.func.isRequired,
    };

    timerTime: number = 3 * 60;

    timer: Timer;

    state = {
        mode: 'wait',
        completed: [],
        displayWords: [],
        speeds: [],
        time: this.timerTime,
    };

    static getDerivedStateFromProps(props: Props, state: State) {
        const { words } = props;
        const { completed } = state;
        const completedCount: number = completed.length;
        const displayWords: Array<string> = words.slice(completedCount);
        return {
            displayWords,
        };
    }

    startGame = () => {
        this.setState({ mode: 'process' });
        this.props.fetchWords();
        this.timer = new Timer(this.timerTime * 1000);
        this.timer.on('tick', (time: number) => {
            const { completed, speeds } = this.state;
            const newState = {
                time,
                speeds,
            };
            if (time % 3 === 0) {
                const timeSpend = this.timerTime - time;
                const speed = completed.length / (timeSpend / 60);
                newState.speeds = speeds.concat([speed]);
            }
            this.setState(newState);
        });
        this.timer.on('alarm', async () => {
            const { words, saveResult, name } = this.props;
            const { completed, speeds } = this.state;
            const timeInMinutes = this.timerTime / 60;
            const avgSpeed = speeds.reduce((speed:number, total:number) => (
                total + speed
            ), 0) / timeInMinutes;
            const endSpeed = completed.length / timeInMinutes;
            const complete = Math.floor((completed.length / words.length) * 100);
            await saveResult({
                avgSpeed,
                endSpeed,
                complete,
                name,
            });
        });
        this.timer.start();
    };

    componentWillUnmount() {
        if (this.timer) {
            this.timer.stop();
        }
    }

    doLogout = () => {
        const { logout } = this.props;
        const { changeLocation } = this.context;
        logout();
        changeLocation(Locations.LOGIN);
    };

    goHistory = () => {
        const { changeLocation } = this.context;
        changeLocation(Locations.HISTORY);
    };

    checkEnter = (e: any) => {
        if (e.which === 13) {
            const enteredWords = e.target.value.split(' ');
            const { displayWords, completed } = this.state;
            const correctWords = [];
            enteredWords.forEach((enteredWord: string, index: number) => {
                if (enteredWord === displayWords[index]) {
                    correctWords.push(enteredWord);
                }
            });
            this.setState({
                completed: completed.concat(correctWords),
            });
            e.target.value = '';
        }
    }

    renderGameContent() {
        const { isLoading } = this.props;
        let content = null;
        if (isLoading) {
            content = <h3>Loading...</h3>;
        } else {
            const { displayWords, completed } = this.state;
            content = (
                <>
                    <div className="home_game_words">
                        <div className="home_game_words_display">
                            {completed.map((word: string, index: number) => (
                                <span className="completed" key={`${word}-${index}`}>{word}</span>
                            ))}
                            {displayWords.map((word: string, index: number) => (
                                <span key={`${word}-${index}`}>{word}</span>
                            ))}
                        </div>
                    </div>
                    <div className="home_game_input">
                        <Input onKeyUp={this.checkEnter} />
                    </div>
                </>
            );
        }
        return (
            <div className="home_game">
                {content}
            </div>
        );
    }

    renderContent() {
        const { mode } = this.state;
        if (mode === 'wait') {
            return (
                <div className="home_wait">
                    <Button size="large" onClick={this.startGame}>Start Game</Button>
                </div>
            );
        }
        return this.renderGameContent();
    }

    render() {
        const { time } = this.state;
        return (
            <div className="home">
                <div className="home_header">
                    <span className="home_header_time">
                        {TimeFormatter.secondsToTime(time)}
                    </span>
                    <Button onClick={this.goHistory}>
                        History
                    </Button>
                    <Button onClick={this.doLogout}>
                        Logout
                    </Button>
                </div>
                {this.renderContent()}
            </div>
        );
    }
}
