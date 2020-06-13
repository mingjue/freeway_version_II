This project is the freeway dasboard project.
There are three parts of it.

# `Goal`
1 I want to update the speed of the application:

- Part A: Update the databse
- Part B: Update the Back-End
- Part C: Update the Front-End

2 Try to use big data

## `Database`
1 Need to have mongodb installed (https://docs.mongodb.com/manual/installation/)

2 Using the python script import a few csv files into mongodb

- run ./free-porject/database/data.py
- A: need to have the csv file
- B: Adjust the csv file path

3 This version I update the database to use two collections instead of one collection

Sample csv:
Part I
|detectorid|starttime|volume|speed|occupancy|status|dqflags|FIELD8|
|----------|---------|------|-----|---------|------|-------|------|
|1345      |9/15/2011|0:00  |0    |0        |0     |0      |      |
|1345      |9/15/2011|0:00  |0    |0        |      |       |      |
|1345      |9/15/2011|0:00  |0    |0        |0     |0      |      |
|1345      |9/15/2011|0:01  |0    |0        |0     |0      |      |
|1345      |9/15/2011|0:01  |0    |0        |0     |0      |      |
|1345      |9/15/2011|0:01  |1    |47       |0     |3      |0     |
|1345      |9/15/2011|0:02  |0    |0        |0     |0      |      |
|1345      |9/15/2011|0:02  |0    |0        |0     |0      |      |
|1345      |9/15/2011|0:02  |1    |66       |1     |2      |0     |

Part II
|detectorid|highwayid|milepost|locationtext|detectorclass|lanenumber|stationid|highwayid|milepost|locationtext|upstream |downstream|stationclass|numberlanes|latlon|length|shortdirection       |direction|highwayname         |FIELD20|FIELD21|FIELD22|FIELD23|
|----------|---------|--------|------------|-------------|----------|---------|---------|--------|------------|---------|----------|------------|-----------|------|------|---------------------|---------|--------------------|-------|-------|-------|-------|
|1345      |3        |14.32   |Sunnyside   |NB           |1         |1        |1045     |3       |14.32       |Sunnyside|NB        |0           |1046       |1     |4     |45.43324,-122.565775 |0.94     |N                   |NORTH  |I-205  |       |       |
|1346      |3        |14.32   |Sunnyside   |NB           |1         |2        |1045     |3       |14.32       |Sunnyside|NB        |0           |1046       |1     |4     |45.43324,-122.565775 |0.94     |N                   |NORTH  |I-205  |       |       |
|1347      |3        |14.32   |Sunnyside   |NB           |1         |3        |1045     |3       |14.32       |Sunnyside|NB        |0           |1046       |1     |4     |45.43324,-122.565775 |0.94     |N                   |NORTH  |I-205  |       |       |
|1348      |3        |14.32   |Sunnyside   |NB           |1         |4        |1045     |3       |14.32       |Sunnyside|NB        |0           |1046       |1     |4     |45.43324,-122.565775 |0.94     |N                   |NORTH  |I-205  |       |       |
|1353      |3        |16.2    |Johnson     |Cr           |NB        |1        |1        |1046    |3           |16.2     |Johnson   |Cr          |NB         |1045  |1047  |1                    |3        |45.45322,-122.572585|1.89   |N      |NORTH  |I-205  |
|1354      |3        |16.2    |Johnson     |Cr           |NB        |1        |2        |1046    |3           |16.2     |Johnson   |Cr          |NB         |1045  |1047  |1                    |3        |45.45322,-122.572585|1.89   |N      |NORTH  |I-205  |
|1355      |3        |16.2    |Johnson     |Cr           |NB        |1        |3        |1046    |3           |16.2     |Johnson   |Cr          |NB         |1045  |1047  |1                    |3        |45.45322,-122.572585|1.89   |N      |NORTH  |I-205  |
|1361      |3        |18.1    |Foster      |NB           |1         |1        |1047     |3       |18.1        |Foster   |NB        |1046        |1117       |1     |3     |45.478984,-122.565617|1.6      |N                   |NORTH  |I-205  |       |       |
|1362      |3        |18.1    |Foster      |NB           |1         |2        |1047     |3       |18.1        |Foster   |NB        |1046        |1117       |1     |3     |45.478984,-122.565617|1.6      |N                   |NORTH  |I-205  |       |       |
|1363      |3        |18.1    |Foster      |NB           |1         |3        |1047     |3       |18.1        |Foster   |NB        |1046        |1117       |1     |3     |45.478984,-122.565617|1.6      |N                   |NORTH  |I-205  |       |       |


3 Run the mongodb

### `Back End`

1 npm install

2 In the project directory, you can run: node free-porject/backend/app.js
the url: [http://localhost:3001](http://localhost:3001)


#### `Front end`
1 npm install
2 npm start
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
