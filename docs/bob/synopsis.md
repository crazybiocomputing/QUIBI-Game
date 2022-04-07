

# Synopsis du jeu sérieux intitulé "Bob"

## Cartes

- **Lio** `char:03`
- **Amy** `char:04`
- **Bob** `char:44`
- **HAL** `char:33`

- **Devoir maison** `item:02`
- **search** `item:15`
- **BLAST** `item:19`
- **bdd** `item:18`
- **species** `item:28`

- **Bâtiment A28 salle 005** `loc:???` ce qu'on veut.


## Contexte

Dans une salle info, **Bob** est en train de se lamenter car il est 11h00 et il doit rendre son devoir de bioinfo à 12h00.
Dans la salle info, il y a 3 personnages:
- **Bob**: Un étudiant de biologie
- **HAL**: L'ordinateur sur lequel travaille **Bob**
- **Lio**: Une étudiante du master de bio-informatique
- **Amy**: Une étudiante du master de bio-informatique

**Bob** doit trouver des séquences protéiques similaires chez _E. coli_ à partir d'une séquence donnée dans le devoir dont le numéro d'accession est `AB011381` (cf: détails en Annexe). 

**Bob** a lancé NCBI:Entrez mais ne sait pas quel mot-clé saisir.

Il y a deux étapes:
- Choisir le bon BLAST (BLASTx)
- Choisir les bons paramètres UniprotKB + _Escherichia coli_

L'énigme doit être résolue en 12 x 5 minutes.

### Solution générale

NCBI Entrez n'est pas la bonne approche. Il faut lancer un BLASTx car la séquence référence est une séquence nucléique. 
Ensuite, il faut paramétrer le BLASTx de la façon suivante:
- Restreindre la recherche sur _UniprotKB_
- Restreindre la recherche sur _Escherichia coli_

```
Database UniProtKB/Swiss-Prot(swissprot)
Organism: Escherichia coli (taxid:562)
```

Il n'y a que 6 résultats. La protéine qui nous intéresse est CusC (MdtQ a une E-value moins bonne).

### Solution Pas à pas (Walkthrough)

1. Voir le sujet. Interroger **Bob** à propos de `item:papiers`. Récupérer `item:search`
2. Interroger **HAL** à propos de `item:papier` (if `item:search`). La séquence est nucléique. `var:seq=1`
3. Demander conseil auprès de **Amy**. Interroger **Amy** à propos de `item:search` (if `item:papiers`). Récupérer `item:BLAST`.
4. Interroger **Lio** à propos de `item:BLAST` (if `item:papier` && `var:seq` == 1). C'est bien BLASTx
5. Retourner voir **Bob**. Interroger **Bob** à propos de **`item:BLAST`** (if `var:seq` == 1 && `var:blast` == 4). Récupérer `item:bdd` et `item:species`.
6. Interroger **HAL** à propos de `item:bdd`. `var:blast+=16`
7. Interroger **HAL** à propos de `item:species`. `var:blast+=32`
8. Déclenchemebt de **event**:runblast (if `var:blast`== 52) pour afficher le résultat final du BLASTx.
9. Fin de partie: **quiz final**

Le chemin idéal se fait en 8 évenements avec une marge de 4 évenements supplémentaires.


## Questions

- Quel est l'outil Bioinformatique utilisé? BLAST (5 points), BLASTx (20 points)
- Quel est le nom de la protéine la plus similaire chez _E. coli_? CusC (20 points)
- Quel est le nom de la banque de données utilisée? UniprotKB (5 points)
- Quel est l'identifiant taxonomique de E. coli utilisé? taxid: 562 (20 points)

score = questions - failure + (60 min - time)

## Settings

- **intro**: if (true) {`additem:papiers`}
  + **fr** Vous venez d'entrer dans la salle info 005 où plusieurs étudiant.e.s travaillent silencieusement devant les ordinateurs quand soudain, un étudiant `char:44` s'arrache les cheveux et se lamente bruyamment en chiffonnant une feuille `item:papiers` qu'il jette au sol avant de la piétiner.

- **variables**
    + blast=0
    + failure=0
    + seq=0
    
> blastn = 1; blastp = 2; blastx = 4; tblastn = 8; UniProtKB = 16; species = 32;
> Si `var:blast` = blastx + UniProtKB + species = 4 + 16 + 32 = 52. C'est gagné, cela déclenche l'évenement `event:runblast`. Le résultat correct s'affiche.

## gamer0

### Bob

- **Bob**.state open
  + ui
  + 

- **Bob**.state close
  + ui
  
  
> à propos de...

- **Bob** :  if (true) {`addchar:03`;`addchar:04`}
  + **fr** Je m'appelle Bob et je suis étudiant en Biologie. Je suis inscrit à un cours de Bioinfo et c'est vraiment difficile. Je viens ici pour travailler sur ordinateur `char:31` car il y a souvent des étudiants en bioinformatique qui peuvent m'aider... D'ailleurs, il y en a deux ici `char:03` et `char:04`.
- **Lio** : 
  + **fr** Je la vois souvent dans cette salle qui est ouverte aux étudiant.e.s d'autres formations. Je l'ai entendu dire qu'elle était en master de bioinformatique.
- **Amy** : 
  +  **fr** Je l'ai déjà vu mais je ne lui ai jamais parlé. Elle travaille toujours avec `char:03`.
- **HAL** (if `char:HAL` == open) then (`additem:search`)
  + **fr** Sur le navigateur web, j'ai utilisé le moteur de recherche NCBI:Entrez `item:search` mais je ne sais pas quoi taper comme mots clés. Je n'y comprends rien du tout. Ah la la!!! et l'heure tourne. C'est la catastrophe.

- **`item:papier`**: if (true) {}
  + **fr**  C'est le sujet de mon projet que je dois rendre avant midi. Vous pouvez le lire. Il vous tend le papier chiffonné.
```
Sujet: 
Vous devez rechercher dans UniprotKB des séquences protéiques similaires 
chez E. coli à partir de la séquence dont le numéro d'accession est 
AB011381. 
```
- **`item:BLAST`**:  if (true) then {`var:blast=2`}
  +   **fr** Oui, c'est une super idée!! Je dois chercher des séquences protéiques, c'est donc un BLASTp que je dois faire. Génial!!! 
  + **en** Yes, that's a great idea!! I have to look for protein sequences, so it's a BLASTp that I have to do. Awesome!!!

- **`item:BLAST`** if (`var:seq`== 1 && `var:blast` == 4) {`additem:bdd`;`additem:species`}
  + **fr** Ouuiiiii!!! bien sûr, je le savais... BLASTx prend en entrée une séquence nucléique traduite et interroge une banque de données protéique... Il ne me reste plus qu'à définir la banque de données `item:bdd` et que je restreigne la recherche `item:species` à l'espèce E. coli.


### HAL

> à propos de...

- **HAL**: if (true) {}
  + **fr**  Dans une fenêtre, un shell Linux et un prompt `$> ` vous attend impassible... 
  + **en**  In a window, a Linux shell and a prompt `$> ` awaits you impassively... ... 

- **`item:papier`** if (`item:search`) {`var:seq=1`}
  + **fr** En tapant sur NCBI:ENTREZ le numéro d'accession, le texte ci-dessous s'affiche. On peut lire que c'est une séquence nucléique. 
```
LOCUS       AB011381       1620 bp    DNA     linear   BCT 28-SEP-2000
DEFINITION  Pseudomonas aeruginosa gene for OprM, complete cds.
ACCESSION   AB011381
KEYWORDS    OprM.
SOURCE      Pseudomonas aeruginosa
```
- **`item:BLAST`** if (`var:seq` == 0) {}
  + **fr** Sur la page NCBI de BLAST, vous ne savez pas quoi faire... il y a des tas de paramètres à définir.
  
- **`item:BLAST`** if (`var:blast` == 2) {`var:failure+=10`}
  + **fr**  Vous choisissez BLASTp et cliquez sur le bouton `BLAST`.... quand soudain, le message d'erreur suivant s'affiche : `Message ID#24 Error: Failed to read the Blast query: GI/accession/sequence mismatch.`. Qu'est ce qui se passe? Visiblement, ce n'était pas une bonne idée... 

- **`item:BLAST`** (if `var:blast` == 6): Vous hésitez entre BLASTx et BLASTp. Lequel choisir?

- **`item:BLAST`** (if `var:seq`== 1 && `var:blast` == 4): Comme la séquence est nucléique, vous choisissez BLASTx et cliquez sur le bouton bleu `BLAST`.... Une grande quantité de résultats de séquences protéiques d'un grand nombre d'espèces s'affiche à l'écran. C'est difficilement exploitable pour répondre au devoir maison. Il faudrait restreindre la recherche.

- **`item:bdd`**  if (true) {`var:blast+=16`}
  + **fr**  Vous sélectionnez dans le menu **Database** &mdash; parmi les banques proposées &mdash; la banque `UniprotKB/Swiss-Prot(swissprot)`. 
  + **en**  You choose in the combo **Database** &mdash; among the listed databanks &mdash; `UniprotKB/Swiss-Prot(swissprot)`. 

- **`item:species`** if (true) {`var:blast+=32`}
  + **fr** Vous saisissez dans le champ texte **Organism**, `Escherichia coli (taxid:562)`. 
  + **en** You type in the textfield **Organism**, `Escherichia coli (taxid:562)`. 

### Lio

> à propos de...

- **Lio** 
  + **fr** Je m'appelle Lio et je suis étudiante en 2ème année de master de Bioinformatique.
  
- **Amy** 
  + **fr** On travaille souvent ensemble sur des projets bioinformatiques.

- **Bob** 
  + **fr** On le voit de temps en temps. Il parle fort et il a l'air bizarre et... toujours en retard sur ces projets.

- **HAL**
  + **fr** C'est un des ordinateurs de la salle info. Il est sous Linux. Il faut avoir un login et un mot de passe pour se connecter.

- **`item:papier`**
  + **fr** C'est un sujet classique de bio-informatique. Ce n'est pas très dur...

- **`item:BLAST`** if (`item:papier`) {`var:blast=6`}
  + **fr** Comme on souhaite trouver des séquences protéiques, le BLASTp ou le BLASTx sont les deux les plus adaptés. Tout dépend de la nature de la séquence `AB011381`.

- **`item:BLAST`** (if `item:papier` && `var:seq` == 1) {`var:blast=4`}
  + **fr** Comme on souhaite trouver des séquences protéiques et que la séquence d'entrée est nucléique, BLASTx est le meilleur choix. .

### Amy

> à propos de...

- **Amy** : Je m'appelle Amy et je suis en 1ère année de master bio-informatique. 
- **Lio** : On travaille ensemble sur un projet de phylogénie sur les variants du COVID-19. 
- **Bob** : Je ne le connais pas...
- **HAL** : C'est un ordinateur Tour classique sous Linux. On l'appelle familièrement HAL en rapport avec ... enfin, vous savez déjà ... La plupart des logiciels pour le développement de programmes et de bio-informatique sont installés.
- **`item:papier`** : Hmmm... Vu le sujet, tout peut être fait en ligne avec un navigateur web. Pas besoin de la ligne de commande sous Linux.
- **`item:search`** (if `item:papiers`): Je ne ferai pas comme Bob qui utilise NCBI:Entrez mais je ferai plutôt une recherche par similarité de séquences avec BLAST `item:BLAST`.
- **`item:BLAST`** : En fonction du type de séquence (nucléique ou protéique) et du type de banques de données (nucléique ou protéique), on peut choisir de lancer BLASTn, BLASTp, BLASTx ou tBLASTn.


### event:runblast

- **runblast** (if `var:blast`==52) BLASTx est lancé avec tous les paramètres modifiés. Après une poignée de secondes d'attente, la page suivante s'affiche avec 6 résultats.

| Description | Scientific Name | Max Score | Total Score | Query Cover | E value | Per. Ident | Acc. Len | Accession|
|-------------|-----------------|-----------|-------------|-------------|---------|------------|----------|----------|
| Multidrug resistance outer membrane protein MdtQ | Escherichia coli CFT073 | 86.3 | 86.3 | 76% | 2e-18 | 25.85% | 478 | Q8FFV6.2 |
| Multidrug resistance outer membrane protein MdtQ | Escherichia coli O157:H7 | 89.7 | 89.7 | 76% | 2e-19 | 26.21% | 478 | Q8X659.3 |
| Putative multidrug resistance outer membrane protein MdtQ | Escherichia coli K-12 | 91.7 | 91.7 | 76% | 4e-20 | 26.39% | 478 | P33369.2 |
| Cation efflux system protein CusC | Escherichia coli K-12 | 315 | 315 | 84% | 1e-102 | 44.23% | 457 | P77211.1 |
| Cation efflux system protein CusC | Escherichia coli O157:H7 | 321 | 321 | 84% | 6e-105 | 44.35% | 460 | Q8XBY3.1 |
| Cation efflux system protein CusC | Escherichia coli CFT073 | 324 | 324 | 84% | 3e-106 | 44.78% | 460 | Q8CWA4.1 |


## Annexes

```
LOCUS       AB011381       1620 bp    DNA     linear   BCT 28-SEP-2000
DEFINITION  Pseudomonas aeruginosa gene for OprM, complete cds.
ACCESSION   AB011381
VERSION     AB011381.1
KEYWORDS    OprM.
SOURCE      Pseudomonas aeruginosa

>AB011381.1 Pseudomonas aeruginosa gene for OprM, complete cds
ATGAAACGGTCCTTCCTTTCCCTGGCGGTAGCCGCTGTCGTTCTGTCCGGCTGCTCGCTGATCCCCGACT
ACCAGCGCCCCGAGGCGCCGGTAGCCGCGGCCTACCCGCAAGGGCAGGCCTACGGGCAGAACACCGGCGC
GGCGGCCGTTCCGGCCGCCGACATCGGCTGGCGCGAGTTCTTCCGCGACCCGCAGTTGCAGCAACTGATC
GGCGTGGCGCTGGAAAACAACCGCGACCTGCGGGTCGCCGCGCTGAACGTCGAGGCCTTCCGGGCGCAGT
ACCGCATCCAGCGGGCCGACCTGTTCCCGCGGATCGGCGTGGACGGTAGCGGCACCCGCCAGCGTTTGCC
GGGCGACCTGTCGACCACCGGCAGTCCGGCGATTTCCAGCCAGTACGGGGTGACCCTGGGCACTACCGCC
TGGGAACTCGATCTCTTCGGCCGCCTGCGCAGCCTGCGCGACCAGGCCCTGGAGCAGTACCTGGCGACCG
AACAGGCGCAGCGCAGCGCGCAGACCACCCTGGTGGCCAGCGTGGCGACCGCCTACCTGACGCTGAAGGC
CGACCAGGCGCAGTTGCAGCTGACCAAGGACACCCTGGGCACCTACCAGAAGAGTTTCGACCTGACCCAG
CGCAGCTACGACGTCGGCGTCGCCTCCGCGCTCGACCTGCGCCAGGCGCAGACCGCCGTGGAAGGCGCCC
GCGCGACCCTGGCGCAGTACACCCGCCTGGTAGCCCAGGACCAGAATGCGCTGGTCCTGCTGCTGGGCTC
CGGGATCCCGGCGAACCTGCCGCAAGGCCTGGGCCTGGACCAGACCCTGCTGACCGAAGTGCCGGCGGGT
CTGCCGTCGGACCTGCTGCAACGGCGCCCGGACATCCTCGAGGCCGAGCACCAGCTCATGGCTGCCAACG
CCAGCATCGGCGCCGCGCGCGCGGCGTTCTTCCCGAGCATCAGCCTGACCGCCAACGCCGGCACCATGAG
CCGCCAACTGTCCGGCCTGTTCGACGCCGGTTCGGGTTCCTGGTTGTTCCAGCCGTCGATCAACCTGCCG
ATCTTCACCGCCGGCAGCCTGCGTGCCAGCCTGGACTACGCGAAGATCCAGAAGGACATCAACGTCGCGC
AGTACGAGAAGGCGATCCAGACGGCGTTCCAGGAAGTCGCCGACGGCCTGGCCGCGCGCGGTACCTTCAC
CGAGCAGTTGCAGGCGCAGCGCGATCTGGTCAAGGCCAGCGACGAGTACTACCAGCTCGCCGACAAGCGC
TATCGCACGGGGGTGGACAACTACCTGACCCTGCTCGACGCGCAACGCTCGCTGTTCACCGCGCAGCAGC
AACTGATCACCGACCGCCTCAATCAGCTGACCAGCGAGGTCAACCTGTACAAGGCCCTCGGCGGCGGCTG
GAACCAGCAGACCGTGACCCAGCAGCAGACCGCGAAGAAGGAAGATCCCCAGGCTTGATCGCCTTCCGCG
CCATGCAAGAACGCCGACCCTAGGGTCGGCGTTTTTTTATCCTCGCGGAAGTCGGCGGGTCCGCGTCACG
GACCCGCTCGGCCTTAGCGGTTGCGGGTCAGCAGTGCGGGGCGCTCGCCCTTGCGCCGCGGTTCCAGCTC
GTCGAGCTGC
```

en Annexe, le message véridique):
```
Message ID#24 Error: Failed to read the Blast query: GI/accession/sequence mismatch: protein input required but nucleotide provided
```


### Résultats du BLASTx

#### Sequences producing significant alignments

> **Note**: Les résultats ont été classés par ordre de score croissant. La bonne réponse correspond à la dernière ligne. 

| Description | Scientific Name | Max Score | Total Score | Query Cover | E value | Per. Ident | Acc. Len | Accession|
|-------------|-----------------|-----------|-------------|-------------|---------|------------|----------|----------|
| Multidrug resistance outer membrane protein MdtQ | Escherichia coli CFT073 | 86.3 | 86.3 | 76% | 2e-18 | 25.85% | 478 | Q8FFV6.2 |
| Multidrug resistance outer membrane protein MdtQ | Escherichia coli O157:H7 | 89.7 | 89.7 | 76% | 2e-19 | 26.21% | 478 | Q8X659.3 |
| Putative multidrug resistance outer membrane protein MdtQ | Escherichia coli K-12 | 91.7 | 91.7 | 76% | 4e-20 | 26.39% | 478 | P33369.2 |
| Cation efflux system protein CusC | Escherichia coli K-12 | 315 | 315 | 84% | 1e-102 | 44.23% | 457 | P77211.1 |
| Cation efflux system protein CusC | Escherichia coli O157:H7 | 321 | 321 | 84% | 6e-105 | 44.35% | 460 | Q8XBY3.1 |
| Cation efflux system protein CusC | Escherichia coli CFT073 | 324 | 324 | 84% | 3e-106 | 44.78% | 460 | Q8CWA4.1 |



