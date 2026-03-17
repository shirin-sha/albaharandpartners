/** Admin-only types for Home Page CMS */

export interface SectionData {
  sectionId: string;
  enabled: boolean;
  order: number;
  ltr: Record<string, unknown>;
  rtl: Record<string, unknown>;
}

export interface SectionEditorProps {
  sectionId: string;
  section?: SectionData | null;
  onSave: (sectionId: string, data: Partial<SectionData>) => void | Promise<void>;
  isOpen: boolean;
  onToggle: () => void;
}

/** Form data shape used by section field components (permissive for form bindings) */
export interface SectionFormData {
  ltr: Record<string, unknown>;
  rtl: Record<string, unknown>;
}

export interface SectionFieldsProps {
  formData: SectionFormData;
  setFormData: React.Dispatch<React.SetStateAction<SectionFormData>>;
  updateField: (lang: 'ltr' | 'rtl', path: string, value: unknown) => void;
}

/** Section id to field component map (sectionId -> React component) */
export type SectionFieldComponent = React.ComponentType<SectionFieldsProps>;
