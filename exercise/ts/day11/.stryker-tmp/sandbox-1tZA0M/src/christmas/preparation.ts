// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { ToyType } from "./toyType";
const TEEN_GIFT_CATEGORY = stryMutAct_9fa48("0") ? "" : (stryCov_9fa48("0"), "Teen");
const NO_GIFT_MESSAGE = stryMutAct_9fa48("1") ? "" : (stryCov_9fa48("1"), "No gifts to prepare.");
const PREPARATION_MESSAGE_TEMPLATE = stryMutAct_9fa48("2") ? "" : (stryCov_9fa48("2"), "{preparer} will prepare the gifts.");
const ELVES = stryMutAct_9fa48("3") ? "" : (stryCov_9fa48("3"), "Elves");
const SANTA = stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), "Santa");
const REQUIRED_PERCENTAGE = stryMutAct_9fa48("5") ? {} : (stryCov_9fa48("5"), {
  [ToyType.EDUCATIONAL]: 0.25,
  [ToyType.FUN]: 0.3,
  [ToyType.CREATIVE]: 0.2
});
const AGE_CATEGORIES_IN_ASCENDING_ORDER = Object.freeze(stryMutAct_9fa48("6") ? [] : (stryCov_9fa48("6"), [stryMutAct_9fa48("7") ? {} : (stryCov_9fa48("7"), {
  maxAge: 2,
  label: stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), "Baby")
}), stryMutAct_9fa48("9") ? {} : (stryCov_9fa48("9"), {
  maxAge: 5,
  label: stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "Toddler")
}), stryMutAct_9fa48("11") ? {} : (stryCov_9fa48("11"), {
  maxAge: 12,
  label: stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), "Child")
})]));
const MIN_SANTA_GIFT_COUNT = 50;
const FALLBACK_RATIO = 1;
const whoWillPrepareTheGifts = stryMutAct_9fa48("13") ? () => undefined : (stryCov_9fa48("13"), (() => {
  const whoWillPrepareTheGifts = (numberOfGifts: number): string => (stryMutAct_9fa48("17") ? numberOfGifts <= MIN_SANTA_GIFT_COUNT : stryMutAct_9fa48("16") ? numberOfGifts >= MIN_SANTA_GIFT_COUNT : stryMutAct_9fa48("15") ? false : stryMutAct_9fa48("14") ? true : (stryCov_9fa48("14", "15", "16", "17"), numberOfGifts > MIN_SANTA_GIFT_COUNT)) ? ELVES : SANTA;
  return whoWillPrepareTheGifts;
})());
export class Preparation {
  static prepareGifts(numberOfGifts: number): string {
    if (stryMutAct_9fa48("18")) {
      {}
    } else {
      stryCov_9fa48("18");
      if (stryMutAct_9fa48("22") ? numberOfGifts > 0 : stryMutAct_9fa48("21") ? numberOfGifts < 0 : stryMutAct_9fa48("20") ? false : stryMutAct_9fa48("19") ? true : (stryCov_9fa48("19", "20", "21", "22"), numberOfGifts <= 0)) return NO_GIFT_MESSAGE;
      const preparer = whoWillPrepareTheGifts(numberOfGifts);
      return PREPARATION_MESSAGE_TEMPLATE.replace(stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), "{preparer}"), preparer);
    }
  }
  static categorizeGift(age: number): string {
    if (stryMutAct_9fa48("24")) {
      {}
    } else {
      stryCov_9fa48("24");
      return stryMutAct_9fa48("25") ? AGE_CATEGORIES_IN_ASCENDING_ORDER.find(({
        maxAge
      }) => age <= maxAge)?.label && TEEN_GIFT_CATEGORY : (stryCov_9fa48("25"), (stryMutAct_9fa48("26") ? AGE_CATEGORIES_IN_ASCENDING_ORDER.find(({
        maxAge
      }) => age <= maxAge).label : (stryCov_9fa48("26"), AGE_CATEGORIES_IN_ASCENDING_ORDER.find(stryMutAct_9fa48("27") ? () => undefined : (stryCov_9fa48("27"), ({
        maxAge
      }) => stryMutAct_9fa48("31") ? age > maxAge : stryMutAct_9fa48("30") ? age < maxAge : stryMutAct_9fa48("29") ? false : stryMutAct_9fa48("28") ? true : (stryCov_9fa48("28", "29", "30", "31"), age <= maxAge)))?.label)) ?? TEEN_GIFT_CATEGORY);
    }
  }
  static ensureToyBalance(toyType: ToyType, toysCount: number, totalToys: number): boolean {
    if (stryMutAct_9fa48("32")) {
      {}
    } else {
      stryCov_9fa48("32");
      const typePercentage = stryMutAct_9fa48("33") ? toysCount * totalToys : (stryCov_9fa48("33"), toysCount / totalToys);
      return stryMutAct_9fa48("37") ? typePercentage < (REQUIRED_PERCENTAGE[toyType] ?? FALLBACK_RATIO) : stryMutAct_9fa48("36") ? typePercentage > (REQUIRED_PERCENTAGE[toyType] ?? FALLBACK_RATIO) : stryMutAct_9fa48("35") ? false : stryMutAct_9fa48("34") ? true : (stryCov_9fa48("34", "35", "36", "37"), typePercentage >= (stryMutAct_9fa48("38") ? REQUIRED_PERCENTAGE[toyType] && FALLBACK_RATIO : (stryCov_9fa48("38"), REQUIRED_PERCENTAGE[toyType] ?? FALLBACK_RATIO)));
    }
  }
}