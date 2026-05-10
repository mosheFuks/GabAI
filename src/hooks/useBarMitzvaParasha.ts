import { useCallback, useState } from "react";
import { HDate } from "@hebcal/core";

type Params = {
  lat?: number;
  lng?: number;
  tz?: string;
};

export const useBarMitzvaParasha = ({
  lat = -34.6037,
  lng = -58.3816,
  tz = "America/Argentina/Buenos_Aires",
}: Params = {}) => {
  const [parasha, setParasha] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchParasha = useCallback(async (dia: number, mes: string, ano: number) => {
    try {
      setLoading(true);
      setError(null);
      setParasha(null);

      // 1. Fecha hebrea → gregoriana
      const hdate = new HDate(dia, mes, ano);
      const gregDate = hdate.greg();

      // 2. Mover al Shabat más cercano (incluyendo hoy si ya es Shabat)
      const dayOfWeek = gregDate.getDay();
      const daysUntilShabbat = (6 - dayOfWeek + 7) % 7;
      gregDate.setDate(gregDate.getDate() + daysUntilShabbat);

      let currentDate = new Date(gregDate);

      // 3. Buscar perashá (loop por si hay Jag)
      for (let i = 0; i < 5; i++) {
        const dateStr = currentDate.toISOString().split("T")[0];

        const url = `https://www.hebcal.com/hebcal?cfg=json&v=1&s=on&maj=on&start=${dateStr}&end=${dateStr}&geo=pos&latitude=${lat}&longitude=${lng}&tzid=${tz}`;

        const res = await fetch(url);
        const data = await res.json();

        // Buscar específicamente perashá
        const parashaItem = data.items?.find(
          (item: any) => item.category === "parashat"
        );

        if (parashaItem) {
          const cleanTitle = parashaItem.title.replace(
            /^Parashat\s*/i,
            ""
          );
          setParasha(cleanTitle);
          return cleanTitle;
        }

        // Solo avanzar a la próxima semana si cae en Jag
        const hasHoliday = data.items?.some(
          (item: any) => item.category === "holiday"
        );

        if (!hasHoliday) {
          // No hay parashá ni Jag, no tiene sentido seguir buscando
          break;
        }

        currentDate.setDate(currentDate.getDate() + 7);
      }

      setError("No se encontró perashá");
      return null;
    } catch (err) {
      console.error(err);
      setError("Error obteniendo perashá");
      return null;
    } finally {
      setLoading(false);
    }
  }, [lat, lng, tz]);

  return { parasha, loading, error, fetchParasha };
};
