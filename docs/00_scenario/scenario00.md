
# game:Mary's Death

> Example of scenario inspired by Chronicles Of Crime Tutorials in youTube


## 1. settings

> **Comment**: Easy Medium Hard Tutorial

- **id** xxxxxx
- **name** 'Mary's Death'
- **level** Medium
- **startLoc** 'Police Station[^lnd1_lO]'
- **initEvent**
- **startTime** 05:00
- **deck**.a London1_Category
- **deck**.b London1_Character
- **deck**.c London1_Forensic
- **deck**.d London1_Location
- **deck**.e London1_Special

### 1.1. general

> Default texts

- introText(en)
```
It's 5am and you receive a call..
```
- introText(fr)
```
Il est 5h00 du matin, vous recevez un appel...
```
- closedLocText(en)
```
You don't have a precise address to visit here
```
- locScannedAgainText(en)
```
Pay attention officer! You are already here!
```
- unusedCardText(en)
```
This card is useless in this game...
```

> TimeCost (in-game minutes)

- **timeCost**._moveToLoc_ 20
- **timeCost**._investigate_ 5
- **timeCost**._scanItem_ 5
- **timeCost**._interrogate_5
- **timeCost**._unusedCard_ 0

> Scores

- score.star1 5
- score.star2 20
- score.star3 40
- score.star4 60
- score.star5 80

> Bonus

- bonus(en)able true
- bonus.idealPlayedTime(ddhhmm) 00:12:00
- bonus.maxTime 00:10:00
- bonus.max 30

### 1.2. ending:001

- solutionText
```
Here, what really happened.
```
- responseBadAnswer
```
Sorry, it looks you are missing something. 
```

#### question:1

- **type** optional
- **text**(en)
```
Where did Mary die?
```
- **text**(fr)
```
Où Mary est-elle décédée?
```

- **answer** addScore (SouthBank[^lnd1_lO], 10)
- **answer** addScore(Greenwich[^lnd1_lM], 20)

#### question:2

- **type** mandatory
- **text**(en)
```
What was used to kill Mary?
```
- **answer** Knife[^lnd1_i22]
- **points** 20


### 1.3. var:wallet

- name Wallet
- value 20
- isPublic false


## 2. loc:SouthBank[^lnd1_lO]

- **id** lnd1_lO
- **title**(en) 'Victim's apartment'
- **title**(fr) 'Appartement de la Victime'
- **default** open

### 2.2 state:open

- **id** open
- **canMoveToThisLocation** true
- **addGameTimeWhenScanned** true
- **specialAction** InvestigateLocation 
- **specialActionSecond** None
- **text**(en)

```
You arrive at the apartment and see the body on the floor.
```
- **text**(fr)
```
Vous arrivez à l'appartement et voyez le corps sur le sol.'
```

### 2.3. state:closed

- **id** closed
- **canMoveToThisLocation** false
- **addGameTimeWhenScanned** true
- **specialAction** None 
- **specialActionSecond** None

### 2.4. scan:Mary[^lnd1_c08]

#### response:001

- **require** isState(Knife[^lnd1_i22], notfound)
- **text**:en
```
This is the victim's body.
We heard her daughter lives in Greenwich. Here is her address.
```

> **Comment**: Change state of daughter's apartment from closed to open.

- **update**: setState(Colette's Apartment[^lnd1_lM],closed,open)


#### response:002

- **require**: isState(Knife[^lnd1_i22] , found)
- **text**:en
```
Mary has been clearly stabbed by that knife we found earlier
```


## 3. loc:Greenwich [^lnd1_lM]

- **id** lnd1_lM
- **title**(en) 'Daughter's apartment'
- **title**(fr) 'Appartement de sa Fille'
- **default** closed

### 3.0. state:open

- **name** open
- **canMoveToThisLocation** true
- **addGameTimeWhenScanned** true
- **specialAction** InvestigateLocation 
- **specialActionSecond** None
- **text**(en)
```
You arrive at the Colette's apartment.
```
- **text**(fr)
```
Vous arrivez à l'appartement de Colette.
```

### 3.1. scan:Colette[^lnd1_c04]

#### response:001

- **text**(en)
```
Hi, what do you want?
```
- **text**(fr)
```
Bonjour, que voulez-vous?
```

## 2. loc:Scotland Yard[^lnd1_lA]

- **id** lnd1_lA
- **title**(en) 'Police Station'
- **title**(fr) Commissariat
- **default** open

### 2.2 state:open

- **id** closed
- **canMoveToThisLocation** true
- **addGameTimeWhenScanned** true
- **specialAction** FinishScenario 
- **specialActionSecond** None


## 4. char:Mary[^lnd1_c08]

- **id** lnd1_c08
- **name** Mary
- **default** dead

### 4.1. state:dead

- **name** dead
- **addGameTimeWhenScanned** true
- **context** None 
- **specialAction** ExitInterrogation


## 5.char:Colette[^lnd1_c04]

- **id** lnd1_c04
- **name** Colette
- **default** NotCooperative

### 5.1. state:NotCooperative

> **ContextMode** None, Interrogation, PlayerCharacter
> **showUI** Default, ClueFound,Location,Interrogation,PhoneEvent,
> GenericEvent,Tutorial,AnsweringQuestion,LocationOrAnsweringQuestion

- **name** NotCooperative
- **addGameTimeWhenScanned** true
- **contextMode** Interrogation 
- **specialAction** ExitInterrogation
- **showUI** Interrogation


### 5.2. state:Cooperative

- **name** Cooperative
- **addGameTimeWhenScanned** true
- **context** Interrogation 
- **specialAction** ExitInterrogation
- **showUI** Interrogation


### 5.3. scan:Mary[^lnd1_c08]

#### response:001

- **require** isState(Colette[^lnd1_c04], NotCooperative)
- **text**(en)
```
Yes, it's my mother.
What??? She's dead?
I have no idea what is going on.
```

#### response:002

- **require** isState(Colette[^lnd1_c04], Cooperative)
- **text**(en)
```
I admit. I was mad at her, but never wanted to kill her.
```


### 5.4. scan:Colette[^lnd1_c04]

#### response:001

- **text**(en)
```
Yes, I'm Mary's daughter!
```

### 5.5. scan:Knife[^lnd1_i22]

#### response:001

- **text**(en)
```
Where do you find that knife? What? My DNA is on it?
OK... I will tell you the truth.
```

- **update** setState(Colette[^lnd1_c04], NotCooperative,Cooperative)


## 6. item:Knife[^lnd1_i22]

- **id** lnd1_i22
- **name** Knife
- **default** notfound

## 7. event:phoneCall

> **type** OneShot Multiple
> **trigger.conditions** TimePassed | InLocation | NotInLocation | ObjectStateCheck | ObjectScanned | CheckCurrentContext | CheckVariableValue |InInterrogationMode | OutInterrogationMode
> **example** outside:Victim's apartment[^lnd1_lO]
>
> **actions** DisplayText | setContext | EnableEvent| DisableEvent | setObjectState | changeGameTime | triggerEnding | setVariableValue | setIntroText
> **displayText** uiType

- **title** 'Phone Call'
- **type** OneShot
- **otherSettings** true

### trigger:Colette admits

- **title** Colette admits
- **when.absoluteGameTime** dd:hh:mm
- **when.eventEnabledAfter** dd:hh:mm
- **when.isState** isState(colette[^lnd1_c04] , cooperative)
- **when.outside** "Daughter's Apartment[^lnd1_lM]"

- **action.type** displayText
- **action.guiType** phoneEvent
- **action.text**(en)
```
*Phone rings*
Good job Officer! 
Come back to the Police Station to give your report.
```

## references

[^lnd1_lM]: Greenwich
[^lnd1_lO]: SouthBank
[^lnd1_c08]: Mary
[^lnd1_c04]: Colette
[^lnd1_i22]: knife


 

