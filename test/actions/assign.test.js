/**
 * Test //actions// module
 */
import { should, expect } from "chai";
should();
expect();

// * Test assign.js - assign students action / command
import {
  utils,
  partition,
  processRecords,
  assignOutliers,
  findTargetGroup,
  popOutliers,
  calcGroupAvgs,
  setupGroupsObject,
  assign
} from "../../actions/assign.js";

const { sortDesc, getRandIdx, calcAvg } = utils;

// Mocks the test file 'test-bcs.csv'
const parsed = [
  { name: "Bates, Brett", avg: 74.48, group: "0" },
  { name: "Bell, Jacqueline", avg: 57.8, group: "0" },
  { name: "Carlson, Thomas", avg: 88.1, group: "0" },
  { name: "Clayton, Alex", avg: 95.52, group: "0" },
  { name: "Cruz, Francisco", avg: 46.8, group: "0" },
  { name: "Curtiss, Clinton", avg: 89.92, group: "0" },
  { name: "Easterling, Mitchell", avg: 80.36, group: "0" },
  { name: "Gwyn, Tanner", avg: 0, group: "0" },
  { name: "Hoffman, Chandler", avg: 55.76, group: "0" },
  { name: "Hokanson, Kerry", avg: 88.4, group: "0" },
  { name: "Howell, Brandon", avg: 72.64, group: "0" },
  { name: "Kuehl, Robert", avg: 77.6, group: "0" },
  { name: "Lampton, Hunter", avg: 67.6, group: "0" },
  { name: "Lawson, McKenna", avg: 70, group: "0" },
  { name: "Linton, Elijah", avg: 81.52, group: "0" },
  { name: "Menchaca, Justo", avg: 72.08, group: "0" },
  { name: "Muci, Nathaniel", avg: 81.32, group: "0" },
  { name: "Nichols, Zane", avg: 72.92, group: "0" },
  { name: "Rahe, Riley", avg: 61.08, group: "0" },
  { name: "Rich, Brandon", avg: 75.84, group: "0" },
  { name: "Roberts, Derek", avg: 73.88, group: "0" },
  { name: "Sherrick, Ethan", avg: 58.8, group: "0" },
  { name: "Stewart, Robert", avg: 83.04, group: "0" },
  { name: "Stigler, Roman", avg: 78.08, group: "0" },
  { name: "Taylor, Paul", avg: 98.72, group: "0" },
  { name: "Torrence, Josh", avg: 62.92, group: "0" },
  { name: "Vanmeter, Seth", avg: 78.32, group: "0" },
  { name: "Warren, Jeremiah", avg: 69.16, group: "0" },
  { name: "Weinkauf, Scott", avg: 77.16, group: "0" },
  { name: "Williams, Steven", avg: 68.32, group: "0" },
  { name: "Zhao, Zhongcheng", avg: 74.88, group: "0" }
];

const sorted = sortDesc(parsed, "avg");
describe("sortDesc utility function", () => {
  it("should return sorted results", () => {
    expect(sorted[0].avg > sorted[sorted.length - 1].avg).to.be.true;
    expect(sorted[sorted.length] - 1 < sorted[sorted.length] - 2);
  });
});

// Order is important here as pop function mutates mock data
describe("popOutliers function", () => {
  const outliers = popOutliers(sorted, 1);
  expect(outliers.length).to.equal(1);
  const { name, avg, group } = outliers[0];
  expect(name).to.equal("Gwyn, Tanner");
  expect(avg).to.equal(0);
  expect(group).to.equal("0");
});

describe("partition function", () => {
  const results = partition(sorted, 1);

  it("should return tuple / array pair", () => {
    results.length.should.equal(2);
  });
  it("should return a single outlier when remainder argument is 1", () => {
    results[0].length.should.equal(1);
    expect(Object.entries(results[0][0]).length).to.equal(3);
  });
});

describe("setupGroubsObject function", () => {
  it("should return array when array-type passed", () => {
    const numberedGroups = setupGroupsObject(6, "array");
    Object.values(numberedGroups).forEach((val) => {
      expect(typeof val === "object").to.be.true;
      expect(val.length).to.equal(0);
    });
  });
  it("should return number when type not passed", () => {
    const numberedGroups = setupGroupsObject(6);
    Object.values(numberedGroups).forEach((val) => {
      expect(typeof val === "number").to.be.true;
      expect(val).to.equal(0);
    });
  });
  it("should return correct number of groups", () => {
    const isFifty = setupGroupsObject(50);
    Object.keys(isFifty).length.should.equal(50);
    const isSeven = setupGroupsObject(7, "array");
    Object.keys(isSeven).length.should.equal(7);
  });
});
