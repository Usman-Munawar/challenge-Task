import React from "react";
import "../css/style.css"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
function Home() {
    // variables
    const [countriesData, setCountriesData] = useState([]);
    const [searchRegion, setSearchRegion] = useState();
    const [searchCountry, setSearchCountry] = useState();

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (searchCountry !== undefined) {
            loadData();
        }
    }, [searchCountry]);

    useEffect(() => {
        if (searchRegion !== undefined) {
            loadData();
        }
    }, [searchRegion]);

    var loadData = async () => {
        var data = "";
        if (searchRegion) {
            // fetch country data by region
            data = await fetch("https://restcountries.com/v3.1/region/" + searchRegion);
        } else if (searchCountry) {
            // fetch country data by name used for search
            data = await fetch("https://restcountries.com/v3.1/name/" + searchCountry);
        } else {
            // fetch all countries data
            data = await fetch("https://restcountries.com/v3.1/all");
        }
        data = await data.json();
        setCountriesData(data);
    };
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <input placeholder="Search for a Country.."
                            className="box-shadow form-control" onChange={(e) => {
                                setSearchCountry(e.target.value);
                            }}
                            type='text'
                        />
                    </div>
                    <div className="col-sm-6">
                        <select
                            className="box-shadow form-control float-right select-style"
                            onChange={(e) => {
                                setSearchRegion(e.target.value);
                            }}
                        >
                            <option value=""> Filter by Region </option>
                            <option value="africa"> Africa </option>
                            <option value="america"> America </option>
                            <option value="asia"> Asia </option>
                            <option value="europe"> Europe </option>
                            <option value="oceania"> Oceania </option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    {countriesData?.map((value, index) => {
                        return <div className="col-sm-3">
                            <Link className="link-style" to={"/detail/" + value.name.common}>
                                <div className="box-shadow box">
                                    <img src={value.flags.png}></img>
                                    <div className="box-text">
                                        <h4>{value.name.common}</h4>
                                        <p>Papolation: <span>{value.population}</span></p>
                                        <p>Region: <span>{value.region}</span></p>
                                        <p>Capital: <span>{value.capital}</span></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;