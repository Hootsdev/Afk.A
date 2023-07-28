---
title: AbEx | Helper
description: >-
  Ваш помощник в сезон экспедиции в Бездну.
template: templates/abex.j2
---

## Apps

//// new | Development in progress [:fontawesome-brands-discord:{.discord} Feedback](https://discord.gg/xjJavhAvv6){.md-button .md-button--primary}

There are a bugs for sure, if you found one or have ideas/feature request click "Feedback".

---

Возможны баги, при обнаружении, а так же с идеями/предложениями, обращаться в дискорде (кнопка Feedback).  

=== "Relic Estimate"
    /// warning | CAUTION
    Calculates estimate for a given goal, based on towns/essence and loot.  
    There are can be minor inaccuracies, see detail in the "bag" section.  
    Overall should be pretty accurate as it takes into account [ **entered** ess.| **Income** | **SELL** | town based avg. **value of dropping relics**<sup id="sp1"><a href="#fn1">1</a></sup>]
    ///
    /// html | div#relic-app
    ///

=== "Bag"
    /// info | Description
    Some relic recipes can be incorrect, it shouldn't be problem since on each tier prices not differs much.  
    Just in case left for first time additional info under each relic:  

    - id: number used as ref in recipes
    - price: build cost only.
    - recipe: required relics
    let me know if found any.
    ///
    /// html | div#relic-bag
    ///

=== "Run Test Form"
    /// info | Description
    Setup team, add attack data and export to csv.
    ///
    /// html | div#attack-app
    ///

    //// details | Team management
        type: settings
        open: False

    /// html | div#team-set
    ///
    ////

=== "Attack Remain Calculator"
    /// info | Description
    Calculates how many attacks on boss can be done + retries.
    ///
    /// html | div#rem-food
    ///

    //// tip | Don't miss a thing!
    Калькулятор атак по ласт боссу.  
    Указываете количество зрителей и текущую стамину,  
    он считает сколько атак можно сделать без потери атаки и сколько ретраев можно сделать.
    ////
////

## Timeleft

<div id="main-event">
  <h1>
    Abyssal Expedition #10
  </h1>
  <div class="main-container">
    <span id="start"></span>
    <span id="silent"></span>
    <span id="left"></span>
  </div>
</div>

## Relics

=== "![all](/afk.GG/assets/icons/tree/hero_tag_all.png){width=24 .skip-lb}"
    ![a][rela]
=== "![Rangers](/afk.GG/assets/icons/tree/tree-celerity.png){width=24 .skip-lb}"
    ![c][relcel]
=== "![Support](/afk.GG/assets/icons/tree/tree-support.png){width=24 .skip-lb}"
    ![su][relsup]
=== "![Mages](/afk.GG/assets/icons/tree/tree-mage.png){width=24 .skip-lb}"
    ![sr][relsor]
=== "![Tank](/afk.GG/assets/icons/tree/tree-fort.png){width=24 .skip-lb}"
    ![rt][reltan]
=== "![Warrior ](/afk.GG/assets/icons/tree/tree-might.png){width=24 .skip-lb}"
    ![rw][relwar]

## Old reddit guide for newcomers

![g][nb]

## Ranking Seasons

| #  | Boss        | Start      | End        |
|----|-------------|------------|------------|
| 1  | Gouldos     | 2020.05.30 | 2020.06.19 |
| 2  | Gouldos     | 2020.08.08 | 2020.08.28 |
| 3  | Ainz+Albedo | 2020.12.12 | 2020.12.28 |
| 4  | Ezizh       | 2021.05.02 | 2021.05.18 |
| 5  | Balancer    | 2021.10.30 | 2021.11.15 |
| 6  | Balancer    | 2022.03.05 | 2021.03.21 |
| 7  | Marsha      | 2022.09.03 | 2021.09.19 |
| 8  | Marsha      | 2022.11.05 | 2021.11.21 |
| 9  | Clawlossus  | 2023.05.07 | 2021.05.23 |
| 10 | Clawlossus  | 2023.07.05 | 2021.07.21 |

### Footnotes

/// example | FORMULA<a id="fn1" href="#sp1">↩︎</a>
*RD~avg~ ÷ t~drop~ × P~rrd~  + (1 - P~rrd~) × RD~avg~ ÷ t~drop~ × C~sell~*
///

RD = Relic drop  
P~rrd~ = chance drop required relic  
C~sell~ = sell price coefficient, which is 40%

[nb]: https://media.discordapp.net/attachments/1128524376929742879/1128524655804825690/aenewbieguide.webp
[rela]: https://media.discordapp.net/attachments/1128524376929742879/1128524476540260444/all.jpg
[relcel]: https://media.discordapp.net/attachments/1128524376929742879/1128524477207171082/celerity.jpg
[relsup]: https://media.discordapp.net/attachments/1128524376929742879/1128524477723054220/image6.jpg
[relsor]: https://media.discordapp.net/attachments/1128524376929742879/1128524478964580503/sorc.jpg
[reltan]: https://media.discordapp.net/attachments/1128524376929742879/1128524480143179866/tanks.jpg
[relwar]: https://media.discordapp.net/attachments/1128524376929742879/1128524480642302093/war.jpg