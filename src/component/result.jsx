import React, { Component } from 'react'

let api = 'http://calapi.inadiutorium.cz/api/v0/en/calendars/default/';

export default class Result extends Component {
    state = {
        isLoaded: false,
        isSet: false,
        error: false,
    }

    getResult() {
        fetch(api, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(myJson => {
            console.log(myJson)
            const newClebration = this.generateCelebrations(myJson)
            this.setState({
                isLoaded: true,
                calendars: myJson,
                celebrations: newClebration,
            })
        })
        .catch(function (err) {
            console.log(err)
        });
    }

    backtoSearch = () => {
        api = 'http://calapi.inadiutorium.cz/api/v0/en/calendars/default/';
        this.setState({ isSet: false, isLoaded: false })
    }

    submitSearch = () => {
        let target = document.querySelector('input').value;
        api += target;

        this.setState({ isSet: true }, () => console.log(api));
        this.getResult();
    }

    generateCelebrations(myJson) {
        if (myJson.celebrations) {
            return myJson.celebrations.map(cel => {
                return <div className='d-flex flex-column align-items-center mb-3'>
                    <div className='border border-info text-info w-50 text-center'>Title</div>
                    <div className='mb-3 text-center'>{cel.title}</div>
                    <div className='border border-info text-info w-50 text-center'>Rank</div>
                    <div className='text-center'>{cel.rank}</div>
                </div>
            })
        }
        else {
            return
        }
    }


    render() {
        let { isLoaded, isSet, calendars, error } = this.state;
        if (!isSet) {
            return (
                <div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
                    <div className='mb-3'>Please Enter The Date You Want to Search</div>
                    <input className='mb-3' required />
                    <button className='btn btn-outline-primary border rounded-pill' onClick={this.submitSearch}>search!</button>
                    <div className='mt-3 text-center text-secondary p-4'>
                        Input format examples: <br />
                        today<br />
                        yesterday<br />
                        tomorrow<br />
                        YYYY/MM/DD
                    </div>
                </div>
            )
        }
        else if (isSet && !isLoaded) {
            return (
                <div>loading...</div>
            )
        }
        else {
            let { date, weekday, season, season_week } = calendars
            return (
                <React.Fragment>
                    <div>
                        <button className='mb-5 btn btn-outline-primary border rounded-pill' onClick={this.backtoSearch}>back to search</button>
                    </div>
                    <div className='d-flex flex-column align-items-center border border-primary p-5'>

                        <div className='mb-5 bg-info text-light w-50 text-center'>
                            {date}
                        </div>
                        <div className='border border-info text-info w-50 text-center'>
                            Weekday
                            </div>
                        <div className='mb-3'>
                            {weekday}
                        </div>
                        <div className='border border-info text-info w-50 text-center'>
                            Season
                            </div>
                        <div className='mb-3'>
                            {season}
                        </div>
                        <div className='border border-info text-info w-50 text-center'>
                            Season Week
                            </div>
                        <div className='mb-3'>
                            {season_week}
                        </div>
                        <div>
                            {this.state.celebrations}
                        </div>
                    </div>
                </React.Fragment>

            )
        }
    }
}
