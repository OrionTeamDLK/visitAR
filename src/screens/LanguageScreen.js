import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LanguageScreen = () => {
    return (
        <View data-test = "LanguageScreen_view">
        <Text data-test = "LanguageScreen_text">VisitAR</Text>
        <Text data-test = "LanguageScreen_text">Language screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default LanguageScreen;


{/*}
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useTranslation, Trans } from "react-i18next";

export default function LanguageScreen() {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const index = 11;

  return (
    <div className="App">
      <div className="App-header">
        <text>{t("Help patrick")}</text>
        <h2>{t("Welcome to React")}</h2>
        <button onClick={() => changeLanguage("de")}>de</button>
        <button onClick={() => changeLanguage("en")}>en</button>
      </div>
      <div className="App-intro">
        <Trans>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Trans>
        <Trans i18nKey="welcome">trans</Trans>
        <Trans>
          {index + 1} <a>xxx</a>
        </Trans>
      </div>
      <div style={{ marginTop: 40 }}>
        Learn more:&nbsp;
        <a href="https://react.i18next.com">https://react.i18next.js</a>
      </div>
    </div>
  );
}

*/}