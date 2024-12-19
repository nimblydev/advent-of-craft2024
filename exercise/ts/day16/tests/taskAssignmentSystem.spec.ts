import { TaskAssignmentSystem } from "../src/taskAssignmentSystem";
import { Elf } from "../src/elf";

describe("TaskAssignmentSystem", () => {
  let system: TaskAssignmentSystem;

  beforeEach(() => {
    const elves = [new Elf(1, 5), new Elf(2, 10), new Elf(3, 20)];
    system = new TaskAssignmentSystem(elves);
  });

  test("reportTaskCompletion increases total tasks completed", () => {
    expect(system.reportTaskCompletion(1)).toBeTruthy();
    expect(system.getTotalTasksCompleted()).toBe(1);
  });

  test("reportTaskCompletion returns false for non-existent elf", () => {
    expect(system.reportTaskCompletion(999)).toBeFalsy();
  });

  test("getElfWithHighestSkill returns the correct elf", () => {
    const highestSkillElf = system.getElfWithHighestSkill();
    expect(highestSkillElf?.id).toBe(3);
  });

  test("assignTask assigns an elf based on skill level", () => {
    expect(system.assignTask(8)).toStrictEqual(new Elf(2, 10));
  });

  test("assignTask returns null if no elf has sufficient skill", () => {
    expect(system.assignTask(21)).toBeNull();
  });

  test("increaseSkillLevel updates elf skill correctly", () => {
    system.increaseSkillLevel(1, 3);
    const elf = system.assignTask(7);
    expect(elf?.id).toBe(1);
  });

  test("increaseSkillLevel does nothing for non-existent elf", () => {
    system.increaseSkillLevel(999, 3);
    const elf = system.assignTask(21);
    expect(elf).toBeNull();
  });

  test("decreaseSkillLevel updates elf skill correctly", () => {
    system.decreaseSkillLevel(1, 3);
    system.decreaseSkillLevel(2, 5);

    const elf = system.assignTask(4);
    expect(elf?.id).toBe(2);
    expect(elf?.skillLevel).toBe(5);
  });

  test("decreaseSkillLevel does nothing for non-existent elf", () => {
    system.decreaseSkillLevel(999, 3);
    const elf = system.assignTask(4);
    expect(elf?.id).toBe(1);
  });

  test("decreaseSkillLevel does not allow negative skill values", () => {
    system.decreaseSkillLevel(1, 10);
    const elf = system.assignTask(4);
    expect(elf?.id).toBe(1);
    expect(elf?.skillLevel).toBe(5);
  });

  test("assignTaskBasedOnAvailability assigns an available elf", () => {
    const elf = system.assignTaskBasedOnAvailability(10);
    expect(elf).not.toBeNull();
  });

  test("assignTaskBasedOnAvailability returns null if no elf is available", () => {
    const elf = system.assignTaskBasedOnAvailability(21);
    expect(elf).toBeNull();
  });

  test("reassignTask changes assignment correctly", () => {
    system.reassignTask(3, 1);
    const elf = system.assignTask(19);
    expect(elf?.id).toBe(1);
  });

  test("reassignTask returns false if fromElf has lower skill than toElf", () => {
    expect(system.reassignTask(1, 3)).toBeFalsy();
  });

  test("reassignTask returns false if either elf does not exist", () => {
    expect(system.reassignTask(999, 1)).toBeFalsy();
    expect(system.reassignTask(1, 999)).toBeFalsy();
  });

  test("assignTask fails when skills required is too high", () => {
    expect(system.assignTask(50)).toBeNull();
  });

  test("listElvesBySkillDescending returns elves in correct order", () => {
    const sortedElves = system.listElvesBySkillDescending();
    expect(sortedElves.map((elf) => elf.id)).toEqual([3, 2, 1]);
  });

  test("resetAllSkillsToBaseline resets all elves skills to a specified baseline", () => {
    system.resetAllSkillsToBaseline(10);
    const elves = system.listElvesBySkillDescending();
    elves.forEach((elf) => expect(elf.skillLevel).toBe(10));
  });

  test("resetAllSkillsToBaseline handles empty elf list", () => {
    system = new TaskAssignmentSystem([]);
    system.resetAllSkillsToBaseline(10);
    expect(system.getTotalTasksCompleted()).toBe(0);
  });

  test("decreaseSkillLevel updates elf skill and do not allow negative values", () => {
    system.decreaseSkillLevel(1, 10);
    const elf = system.assignTask(4);
    expect(elf?.id).toBe(1);
    expect(elf?.skillLevel).toBe(5);
  });
});
