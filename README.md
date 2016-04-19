# DinoMap

## Description

This is the source code for [DinoMap](http://dinomap.twinpedia.com/),
an external web site providing an interactive map for the game DinoRPG
(available in [French](http://www.dinorpg.com/),
[English](http://en.dinorpg.com/), [Spanish](http://es.dinorpg.com/)
or [German](http://www.dinorpg.de/)).  It shows where your dinoz are
located and what areas they can reach.

## License

Unless otherwise noted, all files in this git repository are licensed
under the **GNU Affero GPL 3.0**.  The main difference compared to the
classic GPL 3.0 is that you have to release the source code (such as
the PHP files) if you reuse any part of this code to build an online
service.  For details, please read the file `LICENSE`.

## Information for developpers

### Twinoid API

User authentication is based on the OAuth2 protocol, according to the
[Twinoid API documentation](http://twinoid.com/developers/doc).

The file `include/secrets.php` must include the Twinoid application id
and its secret key.  That sensitive file is not included in this git
repository but the template file `include/secrets.php.template` shows
the expected format for the contents of that file.

### DinoRPG API

The information about the position and characteristics of the dinoz is
provided by the [DinoRPG API](http://www.dinorpg.com/tid/api).