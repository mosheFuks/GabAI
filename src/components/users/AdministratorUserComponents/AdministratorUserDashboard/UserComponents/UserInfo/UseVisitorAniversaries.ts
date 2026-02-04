import { useMemo } from "react";
import { Aniversary, Son, CustomDate } from "../../../../../../structs/structs";
import { HDate } from "@hebcal/core";

interface UseVisitorAniversariesResult {
  yortzait: Aniversary[];
  personalDates: {
    birthDate?: CustomDate;
    birthDateHeb?: CustomDate;
    barMitzvaDateGreg?: CustomDate;
    barMitzvaDateHeb?: CustomDate;
  };
  sonsBarMitzva: Son[];
  hasAnyData: boolean;
  getNextHebrewAnniversary: (date?: CustomDate) => string;
  hebYear: number;
}

export const useVisitorAniversaries = (
  logedVisitorUser: any
): UseVisitorAniversariesResult => {
  const today = new Date();
  const hToday = new HDate(today);
  const hebYear = hToday.getFullYear();

  const getNextHebrewAnniversary = (date?: CustomDate): string => {
    if (!date?.dia || !date?.mes) return "-";

    try {
      const hdate = new HDate(+date.dia, date.mes, hebYear);
      const greg = hdate.greg();
      return `${greg.getDate()}/${greg.getMonth() + 1}/${greg.getFullYear()}`;
    } catch {
      return "-";
    }
  };

  const yortzait = useMemo(
    () =>
      (logedVisitorUser?.aniversarios || []).filter(
        (a: Aniversary) => a.motivo === "Yortzait"
      ),
    [logedVisitorUser]
  );

  const sonsBarMitzva = useMemo(
    () =>
      (logedVisitorUser?.hijos || []).filter(
        (s: Son) => s.genero === "Masculino"
      ),
    [logedVisitorUser]
  );

  const personalDates = useMemo(
    () => ({
      birthDate: logedVisitorUser?.fechaNacimientoGregoriano,
      birthDateHeb: logedVisitorUser?.fechaNacimientoHebreo,
      barMitzvaDateGreg: logedVisitorUser?.fechaBarMitzvaGregoriano,
      barMitzvaDateHeb: logedVisitorUser?.fechaBarMitzvaHebreo,
    }),
    [logedVisitorUser]
  );

  const hasAnyData =
    yortzait.length > 0 ||
    sonsBarMitzva.length > 0 ||
    Object.values(personalDates).some(Boolean);

  return {
    yortzait,
    personalDates,
    sonsBarMitzva,
    hasAnyData,
    getNextHebrewAnniversary,
    hebYear,
  };
};
