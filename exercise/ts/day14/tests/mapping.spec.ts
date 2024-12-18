import { X5T78 } from "../src/children/db2/x5T78";
import { Child, Gender } from "../src/children/dtos/child";
import { ChildMapper } from "../src/children/childMapper";
import fc from "fast-check";
fc.configureGlobal({ numRuns: 100 });
fc.configureGlobal({
  seed: 12345,
});

describe("ChildMapper", () => {
  it("should map X5T78 to Child (Girl)", () => {
    fc.assert(
      fc.property(
        fc.boolean().chain((isAGirl) =>
          fc.record<X5T78>({
            Id: fc.string(),
            N_1: fc.string(),
            N_2: fc.string(),
            N_3: fc.string(),
            CityOfBirth__pc: fc.string(),
            Person_BD: fc.string(),
            Salutation: fc.constant(isAGirl ? "Girl" : "Boy"),
            Type_pc: fc.string(),
            Serv__Gender__TYPE_pc: fc.constant(isAGirl ? "X" : "VJY"),
            DeclaredMonthlySalary__c: fc.string(),
            LegalDocumentExpirationDate1__c: fc
              .date()
              .map((d) => d.toISOString()),
            LegalDocumentIssuingCountry1__c: fc.constant("Paradise"),
            LegalDocumentName1__c: fc.constant("ID"),
            LegalDocumentNumber1__c: fc.string(),
            ST_Num: fc.integer({ min: 1, max: 999 }).map((n) => n.toString()),
            ST____Name: fc.string(),
            ST_C: fc.constant("Paradise"),
            ST_CID: fc.integer({ min: 1, max: 999 }).map((n) => n.toString()),
          })
        ),
        (db2Child: X5T78) => {
          const child: Child = ChildMapper.toDto(db2Child);
          expect(child).toMatchSnapshot("aleatory Children");
        }
      )
    );
  });
});
