/**
 * The privacy and terms pages, as data.
 *
 * **Extracted rather than transcribed.** The prose lived only in React's two pages, and porting it
 * to Vue by hand across eighteen sections is precisely where two editions start saying different
 * things about what a company does with personal data. An earlier draft of this change kept the
 * prose per edition on the grounds that it is placeholder a buyer replaces, which is true, and
 * missed that the transcription itself is the risk.
 *
 * The bold lead-in on a bullet ("Account data. Your name…") is flattened into the sentence. The
 * emphasis was styling rather than meaning, and keeping it would have meant a node format here,
 * which is a markup language in a data file.
 *
 * Every page still ships `LEGAL_TEMPLATE_NOTICE`: this is a starting point, not legal advice.
 */
export interface LegalSectionSpec {
    id: string;
    title: string;
    paragraphs?: readonly string[];
    items?: readonly string[];
}
export interface LegalPageSpec {
    updated: string;
    lead: string;
    sections: readonly LegalSectionSpec[];
}
export declare const PRIVACY_PAGE: LegalPageSpec;
export declare const TERMS_PAGE: LegalPageSpec;
