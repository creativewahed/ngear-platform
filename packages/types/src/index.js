"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.TransactionType = exports.WalletType = exports.WalletStatus = exports.RuleStatus = exports.IntegrationStatus = exports.IntegrationType = exports.UserStatus = exports.TenantPlan = exports.TenantStatus = void 0;
var TenantStatus;
(function (TenantStatus) {
    TenantStatus["ACTIVE"] = "active";
    TenantStatus["INACTIVE"] = "inactive";
    TenantStatus["SUSPENDED"] = "suspended";
    TenantStatus["PENDING"] = "pending";
})(TenantStatus || (exports.TenantStatus = TenantStatus = {}));
var TenantPlan;
(function (TenantPlan) {
    TenantPlan["STARTER"] = "starter";
    TenantPlan["PROFESSIONAL"] = "professional";
    TenantPlan["ENTERPRISE"] = "enterprise";
    TenantPlan["CUSTOM"] = "custom";
})(TenantPlan || (exports.TenantPlan = TenantPlan = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["PENDING"] = "pending";
    UserStatus["SUSPENDED"] = "suspended";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var IntegrationType;
(function (IntegrationType) {
    IntegrationType["REST"] = "rest";
    IntegrationType["GRAPHQL"] = "graphql";
    IntegrationType["WEBHOOK"] = "webhook";
    IntegrationType["DATABASE"] = "database";
    IntegrationType["FILE"] = "file";
})(IntegrationType || (exports.IntegrationType = IntegrationType = {}));
var IntegrationStatus;
(function (IntegrationStatus) {
    IntegrationStatus["ACTIVE"] = "active";
    IntegrationStatus["INACTIVE"] = "inactive";
    IntegrationStatus["ERROR"] = "error";
    IntegrationStatus["SYNCING"] = "syncing";
})(IntegrationStatus || (exports.IntegrationStatus = IntegrationStatus = {}));
var RuleStatus;
(function (RuleStatus) {
    RuleStatus["ACTIVE"] = "active";
    RuleStatus["INACTIVE"] = "inactive";
    RuleStatus["DRAFT"] = "draft";
    RuleStatus["EXPIRED"] = "expired";
})(RuleStatus || (exports.RuleStatus = RuleStatus = {}));
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["ACTIVE"] = "active";
    WalletStatus["FROZEN"] = "frozen";
    WalletStatus["CLOSED"] = "closed";
})(WalletStatus || (exports.WalletStatus = WalletStatus = {}));
var WalletType;
(function (WalletType) {
    WalletType["PREPAID"] = "prepaid";
    WalletType["POSTPAID"] = "postpaid";
    WalletType["CREDIT"] = "credit";
})(WalletType || (exports.WalletType = WalletType = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["CREDIT"] = "credit";
    TransactionType["DEBIT"] = "debit";
    TransactionType["TRANSFER"] = "transfer";
    TransactionType["REFUND"] = "refund";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["COMPLETED"] = "completed";
    TransactionStatus["FAILED"] = "failed";
    TransactionStatus["CANCELLED"] = "cancelled";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
