/*
    DinoMap - Interactive map for Dino-RPG
    Copyright (C) 2016  Bugzilla@Twinoid (http://twinoid.com/user/148)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

/**
 * Names of DinoRPG zones.
 * @constant
 */
var dinorpg_zone_names = [
    'Royaume de Dinoville',
    'Grand Tout Chaud',
    'Îles Atlanteinées',
    'Forêt de Grumel',
    'Monde Sombre',
    'Steppes Magnétiques',
    'Ouest de Dinoville',
    'Île aux Monstres',
    'Île Céleste (Nimbao)',
    'Caushemesh',
    'Test'
];

/**
 * Details for all DinoRPG zones and their locations.
 * (TODO: explain structure)
 * @constant
 */
var dinorpg_zones = [
    // Zone 0 : Royaume de Dinoville
    {
        'dnv': {
            'name': 'Dinoville',
            'desc': 'Bienvenue à Dinoville ! Cette ville a été créée par des éleveurs de Dinoz il y a bien longtemps. Après de nombreux siècles d\'existence, elle est aujourd\'hui la capitale des Humains de Dinoland et le lieu d\'entraînement idéal pour les jeunes Maîtres Dinoz. N\'hésitez pas à bien visiter les alentours avant de vous aventurer dans des contrées plus sauvages.',
            'x': 100,
            'y': 230,
            'icon': 'castle',
            'links': ['univ', 'fountj'],
            'linkscond': ['plaza', 'goplaz']
        },
        'fountj': {
            'name': 'La Fontaine de Jouvence',
            'desc': 'La Fontaine de Jouvence a deux visages. Le jour, c\'est un endroit agréable où viennent se reposer les Maîtres Dinoz fatigués par leurs longs voyages. La nuit, c\'est un endroit hanté par les amoureux éconduits qui observent les reflets de la Lune dans l\'eau de la fontaine en poussant de grands soupirs et en versant de temps en temps quelques larmes. On dit que souvent le matin, l\'eau est légèrement salée.',
            'x': 185,
            'y': 245,
            'icon': 'fount',
            'links': ['papy', 'frcbrt', 'port', 'dnv']
        },
        'papy': {
            'name': 'Chez Papy Joe',
            'desc': 'Papy Joe est un vieux baroudeur qui a voyagé dans sa jeunesse aux quatre coins de Dinoland. Il est aujourd\'hui à la retraite mais continue de raconter ses exploits aux Maîtres Dinoz qui veulent bien l\'écouter. Aux plus patients, il propose des petites Missions dans les environs.',
            'x': 225,
            'y': 80,
            'icon': 'house',
            'links': ['univ', 'fountj', 'frcbrt']
        },
        'univ': {
            'name': 'L\'Université',
            'desc': 'L\'Université de Dinoville est un lieu rempli de professeurs barbus et d\'élèves à l\'air sérieux portant la plupart du temps de grosses lunettes rondes. Impossible de comprendre quoi que ce soit à leurs discussions, si ce n\'est que la survie du monde dépend de leurs recherches. On croise néanmoins de temps en temps à l\'Université un professeur un peu moins agité que les autres qui accepte de vous enseigner quelque chose d\'important.',
            'x': 120,
            'y': 150,
            'icon': 'church',
            'links': ['papy', 'dnv', 'colesc']
        },
        'colesc': {
            'name': 'Collines Escarpées',
            'desc': 'Les Collines Escarpées auraient presque mérité le titre de Montagnes, mais comme juste après elles se trouve le volcan nommé \'Le Grand Tout Chaud\', elles paraissent bien minuscules à côté. Leurs pentes n\'en sont pas moins impossibles à gravir sans le matériel d\'escalade approprié.',
            'x': 110,
            'y': 94,
            'icon': 'default',
            'links': ['univ'],
            'linkscond': ['matesc', 'gogtc']
        },
        'frcbrt': {
            'name': 'Forcebrut',
            'desc': 'Le Tournoi de Forcebrut est l\'un des lieux les plus fréquentés par les éleveurs de Dinoz. Ici, les Dinoz les plus puissants s\'affrontent dans des combats spectaculaires pour le plaisir de tous les spectacteurs. Heureusement, le Tournoi n\'est pas réservé qu\'à l\'élite et de jeunes éleveurs peuvent aussi venir y entraîner leurs Dinoz.',
            'x': 280,
            'y': 215,
            'icon': 'cavern',
            'links': ['marche', 'fountj', 'papy']
        },
        'marche': {
            'name': 'Place du Marché',
            'desc': 'Ce lieu est un grand marché à ciel ouvert ou tout s\'achète et se vend. On y trouve de nombreux marchands venus des quatre coins de Dinoland, ce qui permet parfois d\'obtenir des raretés à un prix très réduit ! Faites attention, c\'est aussi parfois le repère de personnages peu scrupuleux qui n\'hésiteront pas à vous extorquer vos pièces d\'or durement gagnées.',
            'x': 340,
            'y': 270,
            'icon': 'house',
            'links': ['frcbrt']
        },
        'port': {
            'name': 'Port de Prêche',
            'desc': 'Créé par des moines quelques dizaines d\'années auparavant, le Port de Prêche est rapidement devenu florissant grâce aux échanges avec les Iles Atlantéinées. Comme le poisson s\'y trouve en grande quantité, aucun bateau n\'est jamais disponible pour emmener les Dinoz jusqu\'à la première île. Il vous faudra donc soit apprendre à nager à votre Dinoz soit au moins lui trouver une bouée avant de pouvoir traverser.',
            'x': 230,
            'y': 370,
            'icon': 'house',
            'links': ['fountj'],
            'linkscond': [
                '(10pv)', 'xxx_cimetiere',
                '(os)', 'xxx_cimetiere',
                'bouee', 'goiles',
                'monisl', 'gomisl'
            ]
        },
        'xxx_cimetiere': {
            'name': 'Cimetière du Crépuscule',
            'desc': '???',
            'x': 340,
            'y': 360,
            'icon': 'default',
            'links': ['port']
        },
        'gogtc': {
            'name': 'Escalader les montagnes',
            'exitzone': 1,
            'exitid': 'bslt',
            'desc': '',
            'x': 70,
            'y': 40,
            'icon': 'north',
            'links': []
        },
        'goiles': {
            'name': 'Traverser à la Nage',
            'exitzone': 2,
            'exitid': 'ilewkk',
            'desc': '',
            'x': 190,
            'y': 410,
            'icon': 'swim',
            'links': [],
            'labelx': -15
        },
        'gomisl': {
            'name': 'Naviguer vers l\'Ile des monstres',
            'exitzone': 7,
            'exitid': 'mport',
            'desc': '',
            'x': 278,
            'y': 410,
            'icon': 'east',
            'links': [],
            'labelx': 30
        },
        'goplaz': {
            'name': 'Aller à Dinoplaza',
            'exitzone': 6,
            'exitid': 'dplaza',
            'desc': '',
            'x': 30,
            'y': 230,
            'icon': 'west',
            'links': [],
            'labely': -30
        }
    },
    // Zone 1 : Grand Tout Chaud
    {
        'bslt': {
            'name': 'Pentes de Basalte',
            'desc': 'Entre le sol et le sommet du Grand Tout Chaud s\'étendent les Pentes de Basalte. Ce sont de grandes étendues formées de roches volcaniques enchevêtrées. Un chemin s\'y dessine, serpentant jusqu\'au sommet. Les embuscades y sont faciles et fréquentes, il faudra donc faire attention à bien vous défendre en empruntant ce chemin.',
            'x': 122,
            'y': 343,
            'icon': 'default',
            'links': ['goplaz', 'forges']
        },
        'forges': {
            'name': 'Forges du Grand Tout Chaud',
            'desc': 'Proches du sommet du Grand Tout Chaud, les Forges fonctionnent grâce au magma en fusion prélevé directement dans le volcan. Il s\'écoule lentement sur le bas-côté des rues principales, approvisionnant les forgerons qui travaillent jour comme nuit à la fabrique d\'objets en métal, les plus solides de Dinoland paraît-il.',
            'x': 233,
            'y': 245,
            'icon': 'castle',
            'links': ['vener', 'bslt', 'rashpk', 'fosslv'],
            'labelx': 20
        },
        'rashpk': {
            'name': 'Ruines Ashpouk',
            'desc': '',
            'x': 109,
            'y': 275,
            'icon': 'house',
            'links': ['forges']
        },
        'fosslv': {
            'name': 'Fosselave',
            'desc': 'Le plateau de Fosselave se situe tout au sommet du Grand Tout Chaud. La vue y est magnifique car on peut apercevoir Dinoville, les Iles Altantéinées, la Grande Forêt de Grumhel et même parfois les beaux jours les sommets de Caushemesh. Au centre du plateau se dresse un Temple Shaman, qui doit être presque entièrement reconstruit à chaque tremblement de terre, fréquents au sommet du volcan.',
            'x': 185,
            'y': 124,
            'icon': 'default',
            'links': ['forges', 'tunel']
        },
        'vener': {
            'name': 'Repaire du Vénérable',
            'desc': 'Dans un des endroits les plus dangereux du Grand Tout Chaud on peut trouver le Repaire du Vénérable. Il s\'agit d\'une caverne obscure dans laquelle vit un très vieux Dorogon cracheur de feu, et qui en plus a très mauvais caractère et horreur d\'être dérangé. On raconte qu\'il aime bien les petits Korgons... bien grillés et avec un peu de sel.',
            'x': 312,
            'y': 130,
            'icon': 'cavern',
            'links': ['forges'],
            'linkscond': [
                '(tour)', 'tourbt'
            ]
        },
        'tunel': {
            'name': 'Tunnel sous la Branche',
            'desc': 'A l\'écart de Fosselave se dresse un très vieil arbre. Son écorce est tellement épaisse que même les coulées de laves n\'ont pas pu le faire brûler, ce qui lui a sûrement permis de survivre à de nombreuses éruptions volcaniques. Récemment, une coulée de lave a libéré l\'entrée d\'un Tunnel au pied de l\'arbre. Ce Tunnel semble s\'enfoncer très loin dans les profondeurs du Grand Tout Chaud. Pour l\'explorer, il vous faudrait au moins une Lanterne pour éclairer le chemin. ',
            'x': 58,
            'y': 89,
            'icon': 'door',
            'links': ['fosslv'],
            'linkscond': [
                'lantrn', 'stunel'
            ]
        },
        'gorges': {
            'name': 'Gorges Profondes',
            'desc': 'Les Gorges Profondes sont un étroit couloir rocheux qui s\'est creusé sur le flanc du Grand Tout Chaud. Après une succession de vallées inondées, les gorges débouchent sur une vaste Forêt. Vous pouvez voir le Fleuve Jumin couler au sud. Aucun doute, vous pouvez ainsi accéder à la partie Nord de la Forêt de Grumhel !',
            'x': 35,
            'y': 213,
            'icon': 'mountain',
            'links': ['gocamp'],
            'linkscond': [
                'lantrn', 'tunel'
            ]
        },
        'tourbt': {
            'name': 'Tour de Karinbao',
            'desc': ' Une tour gigantesque se dresse fièrement sur le Grand Tout chaud. Elle perce les nuages vous empêchant de voir son sommet. la route sera longue pour arriver au sommet mais la vue vaut le détour.',
            'x': 314,
            'y': 113,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '(tour)', 'vener',
                '(tour)', 'toursk'
            ],
            'labely': -32
        },
        'goplaz': {
            'name': 'Descendre aux Collines Escarpées',
            'desc': '',
            'exitzone': 0,
            'exitid': 'colesc',
            'x': 170,
            'y': 385,
            'icon': 'south',
            'links': []
        },
        'stunel': {
            'name': 'Entrer dans le Tunnel',
            'desc': '',
            'exitzone': 1,
            'exitid': 'gorges',
            'x': 53,
            'y': 154,
            'icon': 'cavern',
            'links': []
        },
        'gocamp': {
            'name': 'Voyager vers le camp des Korgons',
            'exitzone': 3,
            'exitid': 'camp',
            'desc': '',
            'x': 20,
            'y': 250,
            'icon': 'west',
            'links': []
        },
        'toursk': {
            'name': 'Aller vers l\'île céleste',
            'desc': '',
            'exitzone': 8,
            'exitid': 'voie',
            'x': 314,
            'y': 10,
            'icon': 'default',
            'links': []
        }
    },
    // Zone 2 : Îles Atlanteinées
    {
        'ilewkk': {
            'name': 'L\'Ile Waïkiki',
            'desc': 'L\'Ile Waïkiki est une petite île de l\'archipel des Iles Atlantéinées. Elle se distingue par ses palmiers violets, dont les longues feuilles sont utilisées pour donner des couleurs vives à beaucoup de vêtements sur Dinoland. Les humains locaux pratiquent aussi un Art Martial très réputé, le Waïkikidô.',
            'x': 492,
            'y': 89,
            'icon': 'default',
            'links': ['goport', 'corail', 'marais']
        },
        'corail': {
            'name': 'Mines de Corail',
            'desc': 'Jadis enfouies sous l\'eau, de grandes quantités de corail se sont retrouvées un jour propulsées à la surface. Leur extraordinaire solidité fait du Corail un matériel très utilisé à Dinoland. C\'est pour cette raison que cet endroit est désormais une immense mine où travaillent des centaines de personnes.',
            'x': 479,
            'y': 142,
            'icon': 'cavern',
            'links': ['ilewkk', 'marais'],
            'linkscond': [
                '*kaura', 'totem'
            ]
        },
        'marais': {
            'name': 'Marais Collant',
            'desc': 'Ce marais qui occupe le milieu de l\'archipel est un véritable problème pour les voyageurs ! Suivant les jours, il change d\'état. On dit qu\'il existe depuis plusieurs millénaires, et certains pensent même qu\'il s\'agit d\'un gigantesque être vivant doué d\'un très mauvais sens de l\'humour.',
// 'Aujourd\'hui, les eaux sont basses : vous pouvez vous déplacer normalement.',
            'x': 336,
            'y': 124,
            'icon': 'default',
            'links': ['ilewkk', 'corail', 'chutes'],
            'linkscond': [
                '(nimbao)', 'xxx_broc'
            ]
        },
        'chutes': {
            'name': 'Chutes Mutantes',
            'desc': 'Les Chutes Mutantes sont certainement l\'un des plus grands mystères de Dinoland. En effet, l\'eau de l\'océan s\'engouffre à longueur de journée dans cet immense trou sans pour autant que son niveau baisse. De grands scientifiques ont imaginé qu\'il existe un endroit très loin où l\'eau retourne dans l\'océan, mais personne ne les a jamais crus.',
            'x': 103,
            'y': 88,
            'icon': 'default',
            'links': ['baobob', 'marais'],
            'linkscond': [
                'rasca', 'rasca',
                'nenuph', 'gogrum',
                'morsso', 'gosomb'
            ]
        },
        'baobob': {
            'name': 'Chez M. Bao Bob',
            'desc': '',
            'x': 207,
            'y': 80,
            'icon': 'house',
            'links': ['chutes']
        },
        'dome': {
            'name': 'Dôme Soulaflotte',
            'desc': '',
            'x': 87,
            'y': 172,
            'icon': 'castle',
            'links': [],
            'linkscond': [
                'rasca', 'chutes'
            ]
        },
        'xxx_broc': {
            'name': 'Atelier de Broc',
            'desc': '',
            'x': 267,
            'y': 224,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '(nimbao)', 'marais'
            ]
        },
        'totem': {
            'name': 'Ile du Totem',
            'desc': '',
            'x': 587,
            'y': 236,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '*kaura', 'corail'
            ]
        },
        'goport': {
            'name': 'Nager jusqu\'au Port de Prêche',
            'desc': '',
            'exitzone': 0,
            'exitid': 'port',
            'x': 519,
            'y': 54,
            'icon': 'swim',
            'links': []
        },
        'rasca': {
            'name': 'Appeler un Rascaphandre',
            'desc': '',
            'exitzone': 2,
            'exitid': 'dome',
            'x': 110,
            'y': 127,
            'icon': 'rasca',
            'links': []
        },
        'gogrum': {
            'name': 'Contourner les Chutes',
            'desc': '',
            'exitzone': 3,
            'exitid': 'xxx_grum',
            'x': 163,
            'y': 38,
            'icon': 'water',
            'links': [],
            'labelx': 22,
            'labely': 2
        },
        'gosomb': {
            'name': 'Plonger dans les Chutes',
            'desc': '',
            'exitzone': 4,
            'exitid': 'xxx_somb',
            'x': 70,
            'y': 40,
            'icon': 'water',
            'links': [],
            'labelx': -10,
            'labely': 5
        }
    },
    // Zone 3 : Forêt de Grumel
    {
        'auree': {
            'name': 'L\'Orée de la Forêt',
            'desc': 'Au delà de ce point s\'étend la plus profonde, la plus mystérieuse, et surtout la plus dangereuse des forêts de Dinoland. Les plus grands aventuriers y ont souvent laissé leur vie, alors préparez bien votre Dinoz avant d\'y entrer.',
            'x': 339,
            'y': 330,
            'icon': 'cavern',
            'links': ['chemin', 'gochut']
        },
        'chemin': {
            'name': 'Chemin Glauque',
            'desc': 'Au travers de cette immense Forêt, un chemin se dessine. Il s\'agit certainement de l\'endroit qu\'utilisent les éleveurs de Dinoz pour traverser la forêt. En tout cas, mieux vaux ne pas s\'en écarter, car sinon, les risques de se perdre et de finir dévoré par des Korgons est très grand.',
            'x': 320,
            'y': 248,
            'icon': 'default',
            'links': ['fleuve', 'collin']
        },
        'collin': {
            'name': 'Collines hantées',
            'desc': 'Ces collines se dressent à l\'extrême Est de la Forêt, elles sont couvertes de gros arbres sombres qui paraissent parfois vivants et semblent se déplacer pendant la nuit, quand personne ne les observe. Quel mystère ces étranges collines peuvent-elles bien cacher ?',
            'x': 390,
            'y': 210,
            'icon': 'mountain',
            'links': ['fleuve', 'chemin']
        },
        'fleuve': {
            'name': 'Fleuve Jumin',
            'desc': 'Le Fleuve Jumin est le plus grand cours d\'eau de Dinoland. Il traverse et abreuve la grande Forêt de Grumhel à lui tout seul. Au vu de sa largeur et de la force de son courant, il est impossible de le traverser sans équipement de natation avancé. En tout cas, une simple bouée ne suffira pas...',
            'x': 335,
            'y': 118,
            'icon': 'default',
            'links': ['collin', 'chemin'],
            'linkscond': [
                'palmes', 'jungle',
                'palmes', 'camp'
            ]
        },
        'camp': {
            'name': 'Camp Korgon',
            'desc': 'Cette partie de la Forêt est a moitié dévorée par de petites créatures nommé les Korgons. Ils ont très mauvais caractère et passent leur temps à harceler les différentes créatures de la Forêt. Par chance, ce groupe de Korgons semble avoir suffisamment dévoré de bois, et ils ne s\'interessent donc pas trop à vos mollets.',
            'x': 235,
            'y': 53,
            'icon': 'house',
            'links': ['gogorg'],
            'linkscond': [
                'palmes', 'fleuve'
            ]
        },
        'jungle': {
            'name': 'Jungle Sauvage',
            'desc': 'Jadis dans cette partie de la forêt qui ressemble plus à une Jungle, vivaient d\'étranges créatures ressemblant d\'après les rares témoignages à des sortes de Singes-Ninjas. Mais depuis maintenant des dizaines d\'années, aucune de ces créatures n\'a été aperçue, au point que beaucoup doutent aujourd\'hui qu\'elles aient jamais existés.',
            'x': 83,
            'y': 174,
            'icon': 'forest',
            'links': ['garde'],
            'linkscond': [
                'palmes', 'fleuve'
            ]
        },
        'garde': {
            'name': 'Porte de Sylvenoire',
            'desc': 'Cette partie de la Jungle est certainement l\'une des plus méconnues de Dinoland. Peu de maîtres dinoz s\'y sont aventurés, moins encore en sont revenu vivants... La végétation y est si dense qu\'elle forme un véritable mur infranchissable sur plusieurs kilomètres ! La seule ouverture praticable est un petit portail aménagé au bord de la forêt de Sylvenoire et protégé par une créature étrange connue sous le nom de «Gardien de la Forêt».',
            'x': 54,
            'y': 40,
            'icon': 'door',
            'links': ['jungle'],
            'linkscond': [
                'sylkey', 'gostep'
            ]
        },
        'gochut': {
            'name': 'Retourner vers les Chutes',
            'desc': '',
            'exitzone': 2,
            'exitid': 'chutes',
            'x': 326,
            'y': 371,
            'icon': 'water',
            'links': []
        },
        'gogorg': {
            'name': 'Retourner aux Gorges profondes',
            'desc': '',
            'exitzone': 1,
            'exitid': 'gorges',
            'x': 325,
            'y': 20,
            'icon': 'north',
            'links': []
        },
        'gostep': {
            'name': 'Passer la Porte de Sylvenoire',
            'desc': '',
            'exitzone': 5,
            'exitid': 'senter',
            'x': 10,
            'y': 10,
            'icon': 'door',
            'links': []
        }
    },
    // Zone 4 : Monde Sombre
    {
        'dkbao': {
            'name': 'Portail',
            'desc': '',
            'x': 207,
            'y': 80,
            'icon': 'house',
            'links': ['dkchut'],
            'linkscond': [
                '(dk???)', 'fake2'
            ]
        },
        'dkchut': {
            'name': 'Le gouffre des âmes perdues',
            'desc': 'A travers l\'épais brouillard, on entend comme un lointain grondement, de l\'eau qui s\'écoule violemment. Il vaut mieux ne pas aller nager très loin, le courant est très violent...',
            'x': 113,
            'y': 78,
            'icon': 'default',
            'links': ['dkbao', 'dktow'],
            'linkscond': [
                '(gullom)', 'rechut',
                '(gull??)', 'fake'
            ],
            'labelx': -18
        },
        'dktow': {
            'name': 'La Tour Sombre',
            'desc': 'Une grande Tour Noire se dresse dans ce lieu. A première vue elle semble inhabitée mais de nombreux ossements de Dinoz sont entassés à l\'entrée. La grand porte sombre qui permet de rentrer dans la Tour semble entrouverte. Il vaut sûrement mieux ne pas s\'aventurer plus loin pour l\'instant, car entrer dans la Tour serait suicidaire !',
            'x': 316,
            'y': 154,
            'icon': 'default',
            'links': ['dkchut', 'gotow']
        },
        'dktow2': {   // overlaps with 'gotow'
            'name': 'La Tour Sombre 1er étage',
            'desc': 'Les murs assemblés grossièrement se ressemblent tous, il en faudrait peu pour que vous vous perdiez, heureusement, il n\'existe qu\'un seul chemin vers le sommet.',
            'x': 336,
            'y': 134,
            'icon': 'door',
            'links': ['dktow', 'dktow3'],
            'labelx': 73
        },
        'dktow3': {
            'name': 'La Tour Sombre 2ème étage',
            'desc': 'La longue ascension continue, cette Tour peu hospitalière héberge des habitants peu disposé à vous laisser tranquillement aller au sommet.',
            'x': 340,
            'y': 100,
            'icon': 'default',
            'links': ['dktow2', 'dktow4'],
            'labelx': 90,
            'labely': -2
        },
        'dktow4': {
            'name': '1er donjon Sombre',
            'desc': 'Premier donjon de la tour sombre, son accès vient de se révèler, le monde sombre est toujours en constante évolution...',
            'x': 342,
            'y': 75,
            'icon': 'default',
            'links': ['dktow3', 'dktowa', 'dktowb'],
            'labelx': 68,
            'labely': -8
        },
        'dktowa': {
            'name': '2ème donjon Sombre',
            'desc': 'Deuxième donjon de la tour sombre, son accès vient de se révèler, le monde sombre est toujours en constante évolution...',
            'x': 325,
            'y': 60,
            'icon': 'default',
            'links': ['dktow4', 'dktows'],
            'labelx': -75,
            'labely': -14
        },
        'dktowb': {
            'name': '3ème donjon Sombre',
            'desc': 'Troisième donjon de la tour sombre, son accès vient de se révèler, le monde sombre est toujours en constante évolution...',
            'x': 365,
            'y': 60,
            'icon': 'default',
            'links': ['dktow4', 'dktows'],
            'labelx': 75,
            'labely': -14
        },
        'dktows': {
            'name': 'Dernier donjon Sombre',
            'desc': 'Dernier donjon de la tour sombre, son accès vient de se révèler, le monde sombre est toujours en constante évolution...',
            'x': 345,
            'y': 55,
            'icon': 'default',
            'links': ['dktowa', 'dktowb'],
            'labelx': 75,
            'labely': -30
        },
        'fake': {
            'name': '???',
            'desc': 'Une île déserte communément appelé l\'île de la damnation, où quelques âmes en peine viennent s\'échouer. Il fait particulièrement sombre par ici...',
            'x': 119,
            'y': 190,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '(gull??)', 'dkchut'
            ]
        },
        'fake2': {
            'name': '????',
            'desc': '',
            'x': 329,
            'y': 36,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '(dk???)', 'dkbao'
            ],
            'labely': -33
        },
        'gotow': {
            'name': 'Entrer dans la Tour Sombre',
            'desc': '',
            'exitzone': 4,
            'exitid': 'gotow',
            'x': 336,
            'y': 134,
            'icon': 'door',
            'links': ['dktow'],
            'labelx': 65
        },
        'rechut': {
            'name': 'Retourner vers la surface',
            'desc': '',
            'exitzone': 2,
            'exitid': 'chutes',
            'x': 70,
            'y': 40,
            'icon': 'water',
            'links': []
        }
    },
    // Zone 5 : Steppes Magnétiques
    {
        'senter': {
            'name': 'Frontière crépitante',
            'desc': 'Le sentier qui traverse la Porte de Sylvenoire débouche directement sur une immense steppe de sable brûlant s\'étendant à perte de vue... Des arcs électriques déchirent le ciel régulièrement dans un grondement menaçant, résultat du frottement de la Magnétite, la roche qui se trouve en grande quantité dans cette région...',
            'x': 801,
            'y': 464,
            'icon': 'forest',
            'links': ['scross', 'svill', 'gosylv']
        },
        'scross': {
            'name': 'Croisée des nomades',
            'desc': 'Le profond sentier qui serpente ici a été creusé depuis des générations par des esclaves Rocky transportant les cargaisons de Magnétite entre la Citadelle du nord et la forêt de Grumhel. Cette route est aujourd\'hui devenue trop dangereuse pour être praticable seul. Une voie alternative, plus sûre, a été tracée par delà le \'Sabot\', à l\'est.',
            'x': 795,
            'y': 325,
            'icon': 'default',
            'links': ['senter', 'scanyo', 'sking']
        },
        'svill': {
            'name': 'Avant-poste Rocky',
            'desc': 'L\'Avant-poste est un point de relais pour les marchands venus de Grumhel. Plus sûr que la Croisée, cette étape est aussi le dernier havre de paix avant les dangers qui peuplent les Steppes Magnétiques.',
            'x': 945,
            'y': 370,
            'icon': 'house',
            'links': ['senter', 'sking']
        },
        'sking': {
            'name': 'Citadelle du Roi',
            'desc': 'Au centre des steppes se dresse un grand rocher à l\'air étrange. C\'est à l\'intérieur de cet endroit que se niche la Citadelle du Roi Rocky. Depuis des générations, la famille royale - mi-humaine mi-minérale - contrôle les Rockys des alentours et exerce son autorité sur la quasi-totalité des Steppes Magnétiques.',
            'x': 775,
            'y': 226,
            'icon': 'castle',
            'links': ['stowr1', 'svill', 'scross', 'spylon']
        },
        'spylon': {
            'name': 'Pylônes de Magnétite',
            'desc': '',
            'x': 580,
            'y': 190,
            'icon': 'default',
            'links': ['sking', 'slake', 'stowr2']
        },
        'slake': {
            'name': 'Syphon siffleur',
            'desc': 'Les sables mouvants des environs sont extrêmement dangereux : trés riches en Magnétite, ils prennent un reflet qui ressemble à s\'y mépendre à de l\'eau. De nombreux aventuriers assoiffés s\'y sont laissés prendre et se sont fait aspirer vivant. On raconte qu\'à chaque victime, le Syphon emmet un sifflement mélodique, d\'où son nom.',
            'x': 410,
            'y': 270,
            'icon': 'default',
            'links': ['spylon', 'scanyo', 'stowr3'],
            'linkscond': [
                '(steppes?)', 'sband1',
                '*magnet', 'sinto2'
            ]
        },
        'scanyo': {
            'name': 'Sentiers de Toutemba',
            'desc': '',
            'x': 616,
            'y': 356,
            'icon': 'default',
            'links': ['scross', 'slake']
        },
        'stowr1': {
            'name': 'Dévoreuse de l\'Est',
            'desc': '',
            'x': 950,
            'y': 146,
            'icon': 'forest',
            'links': ['sking']
        },
        'stowr2': {
            'name': 'Dévoreuse du Nord',
            'desc': '',
            'x': 496,
            'y': 70,
            'icon': 'forest',
            'links': ['spylon']
        },
        'stowr3': {
            'name': 'Dévoreuse de l\'Ouest',
            'desc': '',
            'x': 353,
            'y': 416,
            'icon': 'forest',
            'links': ['slake']
        },
        'sband1': {
            'name': 'Taudis des Zaxa',
            'desc': '',
            'x': 156,
            'y': 276,
            'icon': 'cavern',
            'links': ['sband3', 'sband2'],
            'linkscond': [
                '(steppes?)', 'slake'
            ]
        },
        'sband2': {
            'name': 'Camp des Emmemma',
            'desc': '',
            'x': 70,
            'y': 172,
            'icon': 'cavern',
            'links': ['sband1'],
            'linkscond': [
                '(brouillard?)', 'sporte'
            ]
        },
        'sband3': {
            'name': 'Campement des Mattmût',
            'desc': '',
            'x': 40,
            'y': 356,
            'icon': 'cavern',
            'links': ['sband1', 'sband2'],
            'linkscond': [
                '(teamw?)', 'scampw'
            ]
        },
        'scampw': {
            'name': 'Repaire de la Team-W',
            'desc': '',
            'x': 26,
            'y': 463,
            'icon': 'house',
            'links': [],
            'linkscond': [
                '(teamw?)', 'sband3'
            ]
        },
        'scaush': {
            'name': 'Confins des Steppes',
            'desc': 'Aux confins des Steppes se dresse une barrière rocheuse infranchissable... on peut appercevoir au loin une chaîne de montagnes, la patrie des Santaz : les monts de Caushemesh. Qui sait quels dangers et quelles aventures vont vous attendre là-bas, si toutefois vous parvenez un jour à y accéder...',
            'x': 250,
            'y': 20,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '*magnet', 'slake',
                '(brouillard?)', 'sporte'
            ]
        },
        'sporte': {
            'name': ' Portes de Caushemesh',
            'desc': '',
            'x': 70,
            'y': 30,
            'icon': 'door',
            'links': [],
            'linkscond': [
                '(brouillard?)', 'scaush',
                '(brouillard?)', 'sband2'
            ]
        },
        'gosylv': {
            'name': 'Retourner à la Forêt de Grumhel',
            'desc': '',
            'exitzone': 4,
            'exitid': 'garde',
            'x': 850,
            'y': 485,
            'icon': 'forest',
            'links': []
        },
        'sinto2': {
            'name': 'S\'approcher du Syphon',
            'desc': '',
            'exitzone': 5,
            'exitid': 'scaush',
            'x': 390,
            'y': 250,
            'icon': 'default',
            'links': [],
            'labely': -32
        }
    },
    // Zone 6 : Ouest de Dinoville
    {
        'dplaza': {
            'name': 'Dinoplaza',
            'desc': 'Ce quartier tout nouveau est encore peu accessible, mais de nombreux habitants viennent régulièrement s\'y installer pour fuir la surpopulation de la capitale. On y trouve de tout et c\'est récemment devenu un endroit très à la mode, où fleurissent de nouvelles attractions tels le Concours de Dinoz.',
            'x': 340,
            'y': 390,
            'icon': 'house',
            'links': ['clinik', 'godnv', 'villa', 'dcine']
        },
        'clinik': {
            'name': 'Clinique de Dinoville',
            'desc': 'C\'est dans ce lieu que s\'est construite la nouvelle clinique de Dinoville, les traitements prodigués aux patients sont réputés pour être les meilleurs de Dinoland.',
            'x': 405,
            'y': 260,
            'icon': 'clinik',
            'links': ['dplaza', 'dcine']
        },
        'dcine': {
            'name': 'Cinéma Paradino',
            'desc': 'Sur les contreforts du Petit Canyon, une caverne de l\'ère Prédinozienne a été aménagée en magnifique Cinéma. Ici s\'y projetent les derniers films à la mode, et de nombreux réalisateurs en herbe viennent s\'essayer à la réalisation de scénarios plus ou moins farfelus.',
            'x': 260,
            'y': 320,
            'icon': 'cavern',
            'links': ['clinik', 'dplaza', 'villa'],
            'linkscond': ['(roi1)', 'poste']
        },
        'villa': {
            'name': 'Villa',
            'desc': 'Une soi-disante villa, ressemblant plus à un cabanon à roulette, paraît échoué sur la plage, on peut lire sur un panneau : \'Attention, dinoz méchant\'. Peut-être vaut-il mieux passer son chemin...?',
            'x': 185,
            'y': 385,
            'icon': 'house',
            'links': ['dplaza', 'dcine']
        },
        'poste': {
            'name': 'Poste de garde',
            'desc': 'Ce poste de garde permet aux soldats du château de pouvoir réguler les entrées et sortie autour du domaine royal. On a une jolie vue du château du Roi de cet endroit. Le poste est très bien gardé et il ne vaut mieux pas embêter les soldats, il parait que leur capitaine est impitoyable !',
            'x': 290,
            'y': 180,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '(roi1)', 'dcine',
                '(roi2)', 'xxx_chateau'
            ]
        },
        'xxx_chateau': {
            'name': 'Château de Dinoville',
            'desc': '???',
            'x': 290,
            'y': 120,
            'icon': 'castle',
            'links': [],
            'linkscond': [
                '(roi2)', 'poste'
            ]
        },
        'godnv': {
            'name': 'Retourner à Dinoville',
            'desc': '',
            'exitzone': 0,
            'exitid': 'dnv',
            'x': 380,
            'y': 348,
            'icon': 'east',
            'links': []
        }
    },
    // Zone 7 : Île aux Monstres
    {
        'mport': {
            'name': 'Port Monstrueux',
            'desc': 'Le Port Monstreux mérite bien son nom... on y trouve toutes sortes de monstres habitant sur l\'Ile. Mais quelquechose semble bizarre dans son organisation, comme si le port était séparé en deux parties distinctes.',
            'x': 102,
            'y': 85,
            'icon': 'default',
            'links': ['bkport', 'mvoutp']
        },
        'mvoutp': {
            'name': 'Avant-Poste Végétox',
            'desc': 'L\'Avant-Poste Végétox est caché au sein d\'une luxuriante forêt. Il est occupé par les forces spéciales Végétox qui sont formées au Camp d\'Elit, et on y trouve des spécialistes en stratégie militaire.',
            'x': 145,
            'y': 145,
            'icon': 'default',
            'links': ['mvpalc', 'mport'],
            'labelx': -25
        },
        'mvpalc': {
            'name': 'Palais d\'Antraxov',
            'desc': 'Véritable forteresse abritant le roi des Végétox, le Palais d\'Antraxov est manifestement un lieu très bien gardé : de multiples gardes patrouillent autour et un intru aura bien du mal à s\'y infiltrer. Le Palais est magnifique : il s\'agit d\'un immense arbre sculté de décorations qui vous rappellent des symboles Cuzcoussiens.',
            'x': 185,
            'y': 190,
            'icon': 'default',
            'links': ['mcelit', 'mvoutp']
        },
        'mcelit': {
            'name': 'Camp d\'Elit',
            'desc': 'Au coeur du territoire Végétox se dresse le camp d\'entrainement secret des forces spéciales Végétox : le Camp d\'Elit ! Dans ce lieu barricadé, les meilleurs soldats Végétox s\'entrainent pour pouvoir un jour remporter la Guerre contre les Frutox. Même si celle-çi dure déjà depuis des temps mémoriaux, le moral des soldats reste intact.',
            'x': 260,
            'y': 210,
            'icon': 'cavern',
            'links': ['mcuzco', 'mvpalc']
        },
        'mcuzco': {
            'name': 'Ruines de Cuzcous',
            'desc': 'Dans cet endroit isolé de l\'Ile des Monstres se dressent les ruines de l\'ancienne capitale de l\'Empire des Montres : la puissante Cuzcous n\'est plus aujourd\'hui qu\'un tas de pierres envahie par la végétation, mais les bâtiments encore debout témoignent d\'une grande civilisation. Sous ces vieilles pierres doivent dormir de nombreux trésors...',
            'x': 265,
            'y': 175,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '(cuz1)', 'mforst',
                '(cuz2)', 'mcelit'
            ]
        },
        'mforst': {
            'name': 'Forêt Kaze Kami',
            'desc': 'La forêt sacrée Kaze Kami est connue pour être le lieu où sont entérés les anciens Grotox, mais on y trouve aussi de nombreuses ruines très anciennes, qui renferment surement de nombreux trésors car peu de fouilles y ont été effectuées...',
            'x': 225,
            'y': 135,
            'icon': 'default',
            'links': ['mfpalc'],
            'linkscond': [
                '(cuz1)', 'mcuzco'
            ],
            'labelx': 10
        },
        'mfpalc': {
            'name': 'Palais du Grotox',
            'desc': 'Le Roi des Frutox se fait appeller le Grotox. On le présente souvent comme le plus puissant de son peuple, et il règne d\'une main de fer sur la partie de l\'Ile des Monstres qui est sous son contrôle.',
            'x': 210,
            'y': 85,
            'icon': 'default',
            'links': ['mforst', 'mfoutp'],
            'labelx': 20
        },
        'mfoutp': {
            'name': 'Avant-Poste Frutox',
            'desc': 'La zone frontalière entre Frutox et Végétox est surveillée avec attention par chaque camp. Cet avant-poste contrôlé par les Frutox est un endroit stratégique puisqu\'il permet d\'espionner les mouvements Végétox tout en protégeant le Palais royal.',
            'x': 167,
            'y': 108,
            'icon': 'default',
            'links': ['mfpalc', 'mforst', 'mvoutp', 'mport']
        },
        'bkport': {
            'name': 'Retourner au Port de Prêche',
            'desc': '',
            'exitzone': 0,
            'exitid': 'port',
            'x': 35,
            'y': 25,
            'icon': 'west',
            'links': []
        }
    },
    // Zone 8 : Île Céleste (Nimbao)
    {
        'iroche': {
            'name': 'Tête de l\'île',
            'desc': '',
            'x': 95,
            'y': 360,
            'icon': 'default',
            'links': []
        },
        'ipont': {
            'name': 'Pont',
            'desc': '',
            'x': 180,
            'y': 295,
            'icon': 'default',
            'links': []
        },
        'iporte': {
            'name': 'Porte du niveau supérieur',
            'desc': '',
            'x': 322,
            'y': 260,
            'icon': 'cavern',
            'links': []
        },
        'icite': {
            'name': 'Cité Arboris',
            'desc': '',
            'x': 460,
            'y': 210,
            'icon': 'castle',
            'links': []
        },
        'ilacro': {
            'name': 'Lac céleste',
            'desc': '',
            'x': 392,
            'y': 343,
            'icon': 'default',
            'links': []
        },
        'ilac': {
            'name': 'Chutes du nirvana',
            'desc': '',
            'x': 310,
            'y': 410,
            'icon': 'default',
            'links': []
        },
        'iplain': {
            'name': 'Plaines enneigées',
            'desc': 'Une large plaine blanche s\'étend à l\'horizon, on ne trouve de la neige que sur la partie nord de l\'île.',
            'x': 160,
            'y': 180,
            'icon': 'default',
            'links': []
        },
        'isnow2': {
            'name': 'Bois givrés',
            'desc': 'Une forêt enneigée se dresse au milieu du blanc uniforme des plaines, un calme intemporel envoûte quiconque songe traverser ses bois...',
            'x': 130,
            'y': 150,
            'icon': 'forest',
            'links': [],
            'labelx': 20
        },
        'imont': {
            'name': 'Mont sacré d\'Everouest',
            'desc': 'Considéré par tous comme un mont sacré, l\'Everouest est un pic abrupte que peu de personne peuvent se vanter d\'avoir escalader. Il est devenu sacré en raison de l\'attachement du précédent Archidorogon à venir se recueillir en son sommet.',
            'x': 90,
            'y': 150,
            'icon': 'mountain',
            'links': [],
            'labelx': -40
        },
        'ihaut': {
            'name': 'Sommet du Mont sacré',
            'desc': '',
            'x': 90,
            'y': 100,
            'icon': 'cavern',
            'links': []
        },
        'prison': {
            'name': 'Priranèse',
            'desc': '',
            'x': 580,
            'y': 305,
            'icon': 'cavern',
            'links': []
        },
        'ilac2': {
            'name': 'Aile Ouest du Dragon',
            'desc': '',
            'x': 550,
            'y': 380,
            'icon': 'default',
            'links': []
        },
        'voie': {
            'name': 'chemin vers l\'Observatoire',
            'desc': 'De loin, l\'immense observatoire impose sa silhouette sur le panorama qui s\'expose à tous. Il est situé sur la queue de Nimbao. Il pointe son objectif vers la surface, l\'étude des étoiles est surement moins intéressantes que la surveillance des monts de Caushemesh.',
            'x': 465,
            'y': 132,
            'icon': 'default',
            'links': ['observ', 'icite'],
            'linkscond': [
                '(tour)', 'tourup'
            ]
        },
        'observ': {
            'name': 'Observatoire',
            'desc': '',
            'x': 550,
            'y': 70,
            'icon': 'church',
            'links': []
        },
        'ville': {
            'name': 'Quartier luxuriant',
            'desc': '',
            'x': 322,
            'y': 200,
            'icon': 'default',
            'links': []
        },
        'ville2': {
            'name': 'Quartier exubérant',
            'desc': '',
            'x': 340,
            'y': 140,
            'icon': 'default',
            'links': []
        },
        'sommet': {
            'name': 'chemin vers le Palais',
            'desc': '',
            'x': 270,
            'y': 90,
            'icon': 'default',
            'links': []
        },
        'palais': {
            'name': 'Palais de l\'Archidorogon',
            'desc': '',
            'x': 320,
            'y': 55,
            'icon': 'castle',
            'links': []
        },
        'tourup': {
            'name': 'Aller vers le Sommet de la Tour de Karinbao',
            'desc': '',
            'exitzone': 1,
            'exitid': 'tourbt', //FIXME: check
            'x': 425,
            'y': 120,
            'icon': 'default',
            'links': [],
            'labely': -32
        }
    },
    // Zone 9 : Caushemesh
    {
        'cgrav': {
            'name': 'Rocher de la gravité',
            'desc': 'Il fut un temps où des recherches étaient menées dans une usine de cette île. Un petit accident a pulvérisé la surface de cet îlot, le condensateur de gravité étant désormais hors de contrôle, un noyau s\'est formé, recréant une nouvelle gravité artificielle. Ronde comme une petite planète, l\'île flotte au gré des flux d\'éther, il lui faut une heure pour faire le tour de toutes les destinations possibles.',
            'x': 445,
            'y': 355,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '(rocher1)', 'cacrop',
                '(rocher2)', 'cpuits',
                '(rocher3)', 'cpyra1',
                '(rocher4)', 'ctecno'
            ]
        },
        'cporte': {
            'name': 'Seuil de Caushemesh',
            'desc': 'Voilà enfin le visage de Caushemesh, cette nation si mystérieuse. Il est difficile de se rendre compte de ce qui fut autrefois le plus puissant état de Dinoland. Caushemesh ressemble désormais à un cratère explosé, baigné dans l\'éther, source d\'énergie infinie qui aura conduit à la catastrophe, donnant ce visage à ce monde.',
            'x': 730,
            'y': 530,
            'icon': 'door',
            'links': ['gotost', 'cacrop']
        },
        'cacrop': {
            'name': 'Acropole Caushemeshenne',
            'desc': 'Une ville surplombe une fosse gigantesque rempli d\'éther. L\'Acropole est déserte, toutes les habitations sont condamnées, pourtant, les murs cloisonnées laissent échapper des bruits suspects, signe qu\'il y a encore des habitants.',
            'x': 650,
            'y': 450,
            'icon': 'house',
            'links': ['cporte'],
            'linkscond': [
                '(rocher1)', 'cgrav'
            ]
        },
        'cpuits': {
            'name': 'Puits éthéral',
            'desc': 'Cette installation, en roue libre désormais, permet de pomper l\'éther et de le transformerer en énergie. L\'éther ainsi collecté, permet d\'alimenter grâce à d\'épais tuyaux le besoin en énergie des différents complexes caushemeshens, dont le palais, qui consomme à lui seul plus de 80% de l\'éther extrait.',
            'x': 368,
            'y': 475,
            'icon': 'default',
            'links': [],
            'linkscond': [
                '(rocher2)', 'cgrav'
            ]
        },
        'ctecno': {
            'name': 'Technodôme englouti',
            'desc': '',
            'x': 510,
            'y': 250,
            'icon': 'church',
            'links': ['ccrane'],
            'linkscond': [
                '(rocher4)', 'cgrav'
            ]
        },
        'ccrane': {
            'name': 'Ile du crâne du démon',
            'desc': '',
            'x': 595,
            'y': 150,
            'icon': 'default',
            'links': ['ctecno', 'cextra']
        },
        'cextra': {
            'name': 'Complexe d\'extraction',
            'desc': '',
            'x': 420,
            'y': 170,
            'icon': 'default',
            'links': ['ccrane']
        },
        'cpyra1': {
            'name': 'Entrée de la Pyramide',
            'desc': 'De ce point de vue, on peut remarquer que Caushemesh bien qu\'évolué technologiquement, est un monde à l\'agonie. Villes détruites, usines englouties, laboratoire en ruines... Quelles surprises vous réservent l\'intérieur du palais... ',
            'x': 330,
            'y': 275,
            'icon': 'default',
            'links': ['cpyra2'],
            'linkscond': [
                '(rocher3)', 'cgrav'
            ]
        },
        'cpyra2': {
            'name': 'Intérieur de la Pyramide',
            'desc': '',
            'x': 265,
            'y': 170,
            'icon': 'castle',
            'links': ['cpyra1']
        },
        'gotost': {
            'name': 'Retourner aux Steppes Magnétiques',
            'desc': '',
            'exitzone': 5,
            'exitid': 'sporte',
            'x': 765,
            'y': 575,
            'icon': 'east',
            'links': ['cporte']
        }
    },
    // Zone 10 : Test
    {
        'xxx_': {
            'name': '',
            'desc': '',
            'x': 0,
            'y': 0,
            'icon': 'default',
            'links': []
        }
    }
];
