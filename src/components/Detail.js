import React from "react";
import "../css/style.css"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faArrowLeftLong, faMoon } from '@fortawesome/free-solid-svg-icons'
function Detail(props) {

    const { name } = useParams();
    const [countriesData, setCountriesData] = useState([]);
    const [countryBorder, setCountryBorder] = useState([]);
    useEffect(() => {
        loadData();
    }, []);

    var loadData = async () => {
        let data = await fetch("https://restcountries.com/v3.1/name/" + name);
        data = await data.json();
        var borders = [];
        // This loop is used for getting the border name from BorderName code
        for (let i = 0; i < data.length; i++) {
            // checking country has border or not
            if (data[i].borders) {
                // Get border name to specific border Code
                for (let j = 0; j < data[i].borders.length; j++) {
                    let borderData = await fetch("https://restcountries.com/v3.1/alpha/" + data[i].borders[j]);
                    borderData = await borderData.json();
                    borders.push(borderData[0].name.common);
                }
            }
            data[i].cBorders = borders;

            // Get currency name of specific Country
            for (var key in data[i].currencies) {
                if (data[i].currencies.hasOwnProperty(key)) {
                    data[i].currency = data[i].currencies[key].name;
                }
            }
            // Get languages name of specific Country
            var languages = [];
            for (var key in data[i].languages) {
                if (data[i].languages.hasOwnProperty(key)) {
                    languages.push(data[i].languages[key]);
                }
            }
            data[i].cLanguages = languages;
        }
        setCountriesData(data);
    };
    return (
        <div>
            <div className="container-fluid">
                <Link className="box-shadow back-btn" to="/">
                    <FontAwesomeIcon icon={faArrowLeftLong} />  Back
                </Link>
                {countriesData?.map((value, index) => {
                    return <div className="row mt-5">
                        <div className="col-sm-6 p-right">
                            <img className="detail-img" src={value.flags.png}></img>
                        </div>
                        <div className="col-sm-6 detail p-left">
                            <h4 className="detail-title-name">{value.name.common}</h4>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p>Native Name: <span>{value.name.common}</span></p>
                                    <p>Papolation: <span>{value.population}</span></p>
                                    <p>Region: <span>{value.region}</span></p>
                                    <p>Sub Region: <span>{value.subregion}</span></p>
                                    <p>Capital: <span>{value.capital}</span></p>
                                </div>
                                <div className="col-sm-6">
                                    <p>Top level Domain: <span>{value.tld}</span></p>
                                    <p>Currencies: <span>{value.currency}</span></p>
                                    <p>Languages: <span>{
                                        // display all the langauges
                                        value.cLanguages.length > 0 ?
                                            value.cLanguages.map((name, index) => {
                                                return <span>{name}{value.cLanguages.length - 1 !== index ? ', ' : null}</span>
                                            }) : <span>No Language</span>
                                    }</span></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 detail">
                                    <p>Borders:
                                        {/* display all the borders */}
                                        {value.cBorders.length > 0 ?
                                            value.cBorders.map((name, index) => {
                                                return <span className="box-shadow border-box">{name}</span>
                                            }) : <span>No Border</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
export default Detail;