export const base44: any = {
  auth: {
    me: async () => {
      // Return null by default (not authenticated). Replace with real logic.
      return null;
    },
    redirectToLogin: (redirectPath = "/") => {
      if (typeof window !== "undefined") {
        window.location.href = `/login?redirect=${encodeURIComponent(redirectPath)}`;
      }
    },
    logout: async () => {},
    updateMe: async (data: any) => data,
  },

  // Lightweight proxy for entities to avoid runtime errors.
  entities: new Proxy({}, {
    get(_, entityName: string) {
      return {
        list: async (..._args: any[]) => [],
        filter: async (..._args: any[]) => [],
        create: async (data: any) => data,
        update: async (id: any, data: any) => ({ id, ...data }),
        delete: async (id: any) => true,
        bulkCreate: async (items: any[]) => items,
      };
    }
  }),

  integrations: {
    Core: {
      UploadFile: async ({ file }: { file: any }) => {
        // In browser, create an object URL for preview; otherwise return a string.
        try {
          if (typeof URL !== "undefined" && file && typeof file === "object") {
            // @ts-ignore
            const url = typeof File !== 'undefined' && file instanceof File ? URL.createObjectURL(file) : String(file?.name || file);
            return { file_url: url };
          }
        } catch (e) {}
        return { file_url: String(file || "") };
      },

      InvokeLLM: async (_opts: any) => {
        // Return a safe mocked response that matches the expected shape.
        return {
          color_palettes: [
            {
              name: "Soft Neutrals",
              colors: ["#F5F5F4", "#E7E5E4", "#D6D3D1", "#BCB7B0"],
              description: "Gentle earthy tones to suit minimal styles."
            }
          ],
          next_designs: ["Minimalist tee with embroidered chest pocket"],
          graphics_patterns: ["Subtle stripes", "Tone-on-tone florals"],
          material_upgrades: ["Organic cotton", "Tencel blend"],
          style_evolution: "Gradually introduce modern cuts with neutral palettes.",
          trending_elements: ["Oversized collars", "Asymmetrical hems"]
        };
      }
    }
  }
};

export default base44;
