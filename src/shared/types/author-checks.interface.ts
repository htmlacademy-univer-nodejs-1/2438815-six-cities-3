export interface OffersAuthorChecks {
  checkDocumentAuthor(offerId: string, userId: string): Promise<boolean>
}
